import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FinanceHealthIndicatorComponent } from './finance-health-indicator.component';

describe('Component: FinanceHealthIndicator', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [FinanceHealthIndicatorComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([FinanceHealthIndicatorComponent],
      (component: FinanceHealthIndicatorComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(FinanceHealthIndicatorComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(FinanceHealthIndicatorComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-finance-health-indicator></app-finance-health-indicator>
  `,
  directives: [FinanceHealthIndicatorComponent]
})
class FinanceHealthIndicatorComponentTestController {
}

