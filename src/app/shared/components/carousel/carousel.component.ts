import {DOCUMENT, JsonPipe} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EnvironmentInjector,
  QueryList,
  ViewChild,
  ViewChildren,
  computed,
  effect,
  inject,
  input,
  runInInjectionContext,
  signal,
  untracked,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {filter, fromEvent, interval} from 'rxjs';

import {CarouselSlide, CarouselSlideComponent} from '@adc/shared';

const THRESHOLD_PERCENTAGE = 0.25;
const AUTO_SHIFT_INTERVAL_SEC = 10;

@Component({
  selector: 'adc-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CarouselSlideComponent, JsonPipe],
})
export class CarouselComponent {
  slides = input.required<CarouselSlide[]>();

  readonly #injector = inject(EnvironmentInjector);
  readonly #document = inject(DOCUMENT);

  #carouselElement = signal<HTMLUListElement | undefined>(undefined);
  #slideElements = signal<HTMLLIElement[]>([]);
  #slideCount = computed(() => this.slides().length);
  #mouseDown = signal(false);
  #touchStarted = signal(false);
  #dragStarted = computed(() => this.#mouseDown() || this.#touchStarted());
  #carouselPreviousPosition = signal(0);
  #dragPosition = signal(0);
  #slideWidth = computed(() => this.#slideElements()[0]?.offsetWidth ?? 0);
  #threshold = computed(() => this.#slideWidth() * THRESHOLD_PERCENTAGE);
  #slideIndex = signal(0);
  #shiftAllowed = signal(true);
  #autoShiftAllowed = computed(() => !this.#dragStarted());

  protected infiniteSlides = computed(() => {
    if (!this.slides().length) return [];

    const firstSlide = this.slides()[0];
    const lastSlide = this.slides()[this.slides().length - 1];
    return [lastSlide, ...this.slides(), firstSlide];
  });

  @ViewChild('carouselElement')
  protected set _carouselElement(carousel: ElementRef<HTMLUListElement>) {
    this.#carouselElement.set(carousel.nativeElement);
  }

  @ViewChildren('slideElement')
  protected set _slideElements(slides: QueryList<ElementRef<HTMLLIElement>>) {
    this.#slideElements.set(slides.toArray().map((slide) => slide.nativeElement));
  }

  constructor() {
    effect(() => {
      const carouselElement = this.#carouselElement();

      if (!carouselElement) return;

      untracked(() => {
        this.#initEventListeners(carouselElement);
        this.#initAutoShift();
      });
    });
  }

  #initEventListeners(carouselElement: HTMLUListElement): void {
    runInInjectionContext(this.#injector, () => {
      fromEvent<MouseEvent>(carouselElement, 'mousedown')
        .pipe(takeUntilDestroyed())
        .subscribe(this.#handleMouseDownEvent.bind(this));

      fromEvent<MouseEvent>(this.#document, 'mousemove')
        .pipe(
          takeUntilDestroyed(),
          filter(() => this.#mouseDown()),
        )
        .subscribe(this.#handleMouseMoveEvent.bind(this));

      fromEvent<MouseEvent>(this.#document, 'mouseup')
        .pipe(
          takeUntilDestroyed(),
          filter(() => this.#mouseDown()),
        )
        .subscribe(this.#handleMouseUpEvent.bind(this));

      fromEvent<TouchEvent>(carouselElement, 'touchstart')
        .pipe(takeUntilDestroyed())
        .subscribe(this.#handleTouchStartEvent.bind(this));

      fromEvent<TouchEvent>(carouselElement, 'touchmove')
        .pipe(takeUntilDestroyed())
        .subscribe(this.#handleTouchMoveEvent.bind(this));

      fromEvent<TouchEvent>(carouselElement, 'touchend')
        .pipe(takeUntilDestroyed())
        .subscribe(this.#handleTouchEndEvent.bind(this));

      fromEvent<TransitionEvent>(carouselElement, 'transitionend')
        .pipe(takeUntilDestroyed())
        .subscribe(this.#handleTransitionEndEvent.bind(this));
    });
  }

  #initAutoShift(): void {
    runInInjectionContext(this.#injector, () => {
      interval(AUTO_SHIFT_INTERVAL_SEC * 1000)
        .pipe(
          takeUntilDestroyed(),
          filter(() => this.#autoShiftAllowed()),
        )
        .subscribe(() => this.#shiftSlide('left'));
    });
  }

  #shiftSlide(direction: 'left' | 'right', mode: 'auto' | 'drag' = 'auto'): void {
    const carouselElement = this.#carouselElement();

    if (!carouselElement || !this.#shiftAllowed()) return;

    carouselElement.classList.add('shifting');

    if (mode === 'auto') {
      this.#carouselPreviousPosition.set(carouselElement.offsetLeft ?? 0);
    }

    if (direction === 'left') {
      carouselElement.style.left = `${this.#carouselPreviousPosition() - this.#slideWidth()}px`;
      this.#slideIndex.update((index) => index + 1);
    } else if (direction === 'right') {
      carouselElement.style.left = `${this.#carouselPreviousPosition() + this.#slideWidth()}px`;
      this.#slideIndex.update((index) => index - 1);
    }

    this.#shiftAllowed.set(false);
  }

  #stopEvent(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
  }

  #handleDragEnd(): void {
    const carouselElement = this.#carouselElement();

    if (!carouselElement) return;

    const finalPosition = carouselElement.offsetLeft;
    const offset = finalPosition - this.#carouselPreviousPosition();

    if (offset < -this.#threshold()) {
      this.#shiftSlide('left', 'drag');
      return;
    }

    if (offset > this.#threshold()) {
      this.#shiftSlide('right', 'drag');
      return;
    }

    carouselElement.style.left = `${this.#carouselPreviousPosition()}px`;
  }

  #handleMouseDownEvent(event: MouseEvent): void {
    const carouselElement = this.#carouselElement();

    if (!carouselElement) return;

    this.#stopEvent(event);
    this.#mouseDown.set(true);
    this.#carouselPreviousPosition.set(carouselElement.offsetLeft);
    this.#dragPosition.set(event.clientX);
  }

  #handleMouseMoveEvent(event: MouseEvent): void {
    const carouselElement = this.#carouselElement();

    if (!carouselElement) return;

    this.#stopEvent(event);
    const offset = this.#dragPosition() - event.clientX;
    this.#dragPosition.set(event.clientX);
    carouselElement.style.left = `${carouselElement.offsetLeft - offset}px`;
  }

  #handleMouseUpEvent(event: MouseEvent): void {
    this.#stopEvent(event);
    this.#mouseDown.set(false);
    this.#handleDragEnd();
  }

  #handleTouchStartEvent(event: TouchEvent): void {
    const carouselElement = this.#carouselElement();

    if (!carouselElement) return;

    this.#stopEvent(event);
    this.#touchStarted.set(true);
    this.#carouselPreviousPosition.set(carouselElement.offsetLeft);
    this.#dragPosition.set(event.touches[0].clientX);
  }

  #handleTouchMoveEvent(event: TouchEvent): void {
    const carouselElement = this.#carouselElement();

    if (!carouselElement) return;

    this.#stopEvent(event);
    const offset = this.#dragPosition() - event.touches[0].clientX;
    this.#dragPosition.set(event.touches[0].clientX);
    carouselElement.style.left = `${carouselElement.offsetLeft - offset}px`;
  }

  #handleTouchEndEvent(event: TouchEvent): void {
    this.#stopEvent(event);
    this.#touchStarted.set(false);
    this.#handleDragEnd();
  }

  #handleTransitionEndEvent(event: TransitionEvent): void {
    const carouselElement = this.#carouselElement();

    if (!carouselElement) return;

    this.#stopEvent(event);
    carouselElement.classList.remove('shifting');

    if (this.#slideIndex() === -1) {
      carouselElement.style.left = `-${this.#slideCount() * this.#slideWidth()}px`;
      this.#slideIndex.set(this.#slideCount() - 1);
    }

    if (this.#slideIndex() === this.#slideCount()) {
      carouselElement.style.left = `-${this.#slideWidth()}px`;
      this.#slideIndex.set(0);
    }

    this.#shiftAllowed.set(true);
  }
}
