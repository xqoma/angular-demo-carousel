import {Signal} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {FormControl, FormControlOptions} from '@angular/forms';

export function formControlToSignal<T = unknown>(control: FormControl<T>): Signal<T> {
  return toSignal(control.valueChanges, {initialValue: control.getRawValue()});
}

export function nonNullableFormControl<T = unknown>(
  value: T,
  opts?: Omit<FormControlOptions, 'nonNullable'>,
): FormControl<T> {
  return new FormControl<T>(value, {...opts, nonNullable: true});
}
