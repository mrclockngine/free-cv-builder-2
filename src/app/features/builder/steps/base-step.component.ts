import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseComponent } from '../../../core/base.component';

@Component({
  template: '',
})
export abstract class BaseStepComponent<T>
  extends BaseComponent
  implements OnInit
{
  abstract form: FormGroup;

  ngOnInit(): void {
    this.sub$.sink = this.form.valueChanges.subscribe((value) => {
      this.onFormValueChanged(value);
    });
  }

  getFormControl(controlName: string) {
    return this.form.get(controlName) as FormControl;
  }

  abstract onFormValueChanged(v: T): void;
}
