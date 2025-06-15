import { Component, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';
import { IconName, icons } from './icons';

@Component({
  template: '',
})
export abstract class BaseComponent implements OnDestroy {
  protected sub$ = new SubSink();

  getIcon(name: IconName) {
    return icons[name];
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
