import {DOCUMENT} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  EnvironmentInjector,
  QueryList,
  Renderer2,
  ViewChild,
  WritableSignal,
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

import {CarouselSlideComponent} from '@adc/shared';

const DEFAULT_AUTO_SHIFT_INTERVAL_SEC = 10;
const DEFAULT_THRESHOLD_PERCENTAGE = 25;

@Component({
  selector: 'adc-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CarouselSlideComponent],
})
export class CarouselComponent {
  autoShift = input<boolean>(true);
  autoShiftIntervalSec = input<number>(DEFAULT_AUTO_SHIFT_INTERVAL_SEC);
  thresholdPercentage = input<number>(DEFAULT_THRESHOLD_PERCENTAGE);

  readonly #injector = inject(EnvironmentInjector);
  readonly #document = inject(DOCUMENT);
  readonly #renderer = inject(Renderer2);

  @ViewChild('carouselElement')
  protected set _carouselElement(carousel: ElementRef<HTMLElement>) {
    this.#carouselElement = signal(carousel.nativeElement);
  }
  #carouselElement: WritableSignal<HTMLElement>;

  @ContentChildren(CarouselSlideComponent, {read: ElementRef<HTMLElement>})
  protected set _slideElements(slides: QueryList<ElementRef<HTMLElement>>) {
    this.#slideElements = signal(slides.map((slide) => slide.nativeElement));
  }
  #slideElements: WritableSignal<HTMLElement[]>;

  #slideCount = computed(() => this.#slideElements().length);
  #slideWidth = computed(() => this.#slideElements()[0].offsetWidth);
  #threshold = computed(() => this.#slideWidth() * (this.thresholdPercentage() / 100));

  #mouseDown = signal(false);
  #touchStarted = signal(false);
  #dragStarted = computed(() => this.#mouseDown() || this.#touchStarted());
  #shiftAllowed = signal(true);
  #autoShiftAllowed = computed(() => this.autoShift() && !this.#dragStarted());

  #carouselPreviousPosition = signal(0);
  #dragPosition = signal(0);
  #slideIndex = signal(0);

  constructor() {
    effect(() => {
      if (!this.#slideElements().length) return;
      untracked(() => this.#initProxySlideElements());
    });

    effect(() => {
      if (!this.#carouselElement()) return;
      untracked(() => {
        this.#initEventListeners();
        this.#initAutoShift();
      });
    });
  }

  #initProxySlideElements(): void {
    const firstSlideElement = this.#slideElements()[0];
    const lastSlideElement = this.#slideElements()[this.#slideElements().length - 1];

    this.#renderer.insertBefore(
      this.#carouselElement(),
      lastSlideElement.cloneNode(true),
      firstSlideElement,
    );
    this.#renderer.appendChild(this.#carouselElement(), firstSlideElement.cloneNode(true));
  }

  #initEventListeners(): void {
    runInInjectionContext(this.#injector, () => {
      fromEvent<MouseEvent>(this.#carouselElement(), 'mousedown')
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

      fromEvent<TouchEvent>(this.#carouselElement(), 'touchstart')
        .pipe(takeUntilDestroyed())
        .subscribe(this.#handleTouchStartEvent.bind(this));

      fromEvent<TouchEvent>(this.#carouselElement(), 'touchmove')
        .pipe(takeUntilDestroyed())
        .subscribe(this.#handleTouchMoveEvent.bind(this));

      fromEvent<TouchEvent>(this.#carouselElement(), 'touchend')
        .pipe(takeUntilDestroyed())
        .subscribe(this.#handleTouchEndEvent.bind(this));

      fromEvent<TransitionEvent>(this.#carouselElement(), 'transitionend')
        .pipe(takeUntilDestroyed())
        .subscribe(this.#handleTransitionEndEvent.bind(this));
    });
  }

  #initAutoShift(): void {
    runInInjectionContext(this.#injector, () => {
      interval(this.autoShiftIntervalSec() * 1000)
        .pipe(
          takeUntilDestroyed(),
          filter(() => this.#autoShiftAllowed()),
        )
        .subscribe(() => this.#shiftSlide('left'));
    });
  }

  #shiftSlide(direction: 'left' | 'right', mode: 'auto' | 'drag' = 'auto'): void {
    if (!this.#carouselElement() || !this.#shiftAllowed()) return;

    this.#carouselElement().classList.add('shifting');

    if (mode === 'auto') {
      this.#carouselPreviousPosition.set(this.#carouselElement().offsetLeft);
    }

    if (direction === 'left') {
      this.#carouselElement().style.left = `${this.#carouselPreviousPosition() - this.#slideWidth()}px`;
      this.#slideIndex.update((index) => index + 1);
    }

    if (direction === 'right') {
      this.#carouselElement().style.left = `${this.#carouselPreviousPosition() + this.#slideWidth()}px`;
      this.#slideIndex.update((index) => index - 1);
    }

    this.#shiftAllowed.set(false);
  }

  #stopEvent(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
  }

  #handleDragEnd(): void {
    const offset = this.#carouselElement().offsetLeft - this.#carouselPreviousPosition();

    if (offset < -this.#threshold()) {
      this.#shiftSlide('left', 'drag');
      return;
    }

    if (offset > this.#threshold()) {
      this.#shiftSlide('right', 'drag');
      return;
    }

    this.#carouselElement().style.left = `${this.#carouselPreviousPosition()}px`;
  }

  #handleMouseDownEvent(event: MouseEvent): void {
    this.#stopEvent(event);
    this.#mouseDown.set(true);
    this.#carouselPreviousPosition.set(this.#carouselElement().offsetLeft);
    this.#dragPosition.set(event.clientX);
  }

  #handleMouseMoveEvent(event: MouseEvent): void {
    this.#stopEvent(event);
    const offset = this.#dragPosition() - event.clientX;
    this.#dragPosition.set(event.clientX);
    this.#carouselElement().style.left = `${this.#carouselElement().offsetLeft - offset}px`;
  }

  #handleMouseUpEvent(event: MouseEvent): void {
    this.#stopEvent(event);
    this.#mouseDown.set(false);
    this.#handleDragEnd();
  }

  #handleTouchStartEvent(event: TouchEvent): void {
    this.#stopEvent(event);
    this.#touchStarted.set(true);
    this.#carouselPreviousPosition.set(this.#carouselElement().offsetLeft);
    this.#dragPosition.set(event.touches[0].clientX);
  }

  #handleTouchMoveEvent(event: TouchEvent): void {
    this.#stopEvent(event);
    const offset = this.#dragPosition() - event.touches[0].clientX;
    this.#dragPosition.set(event.touches[0].clientX);
    this.#carouselElement().style.left = `${this.#carouselElement().offsetLeft - offset}px`;
  }

  #handleTouchEndEvent(event: TouchEvent): void {
    this.#stopEvent(event);
    this.#touchStarted.set(false);
    this.#handleDragEnd();
  }

  #handleTransitionEndEvent(event: TransitionEvent): void {
    this.#stopEvent(event);
    this.#carouselElement().classList.remove('shifting');

    if (this.#slideIndex() === -1) {
      this.#carouselElement().style.left = `-${this.#slideCount() * this.#slideWidth()}px`;
      this.#slideIndex.set(this.#slideCount() - 1);
    }

    if (this.#slideIndex() === this.#slideCount()) {
      this.#carouselElement().style.left = `-${this.#slideWidth()}px`;
      this.#slideIndex.set(0);
    }

    this.#shiftAllowed.set(true);
  }
}
