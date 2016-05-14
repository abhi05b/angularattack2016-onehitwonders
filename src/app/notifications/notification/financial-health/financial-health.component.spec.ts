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
import { FinancialHealthComponent } from './financial-health.component';

describe('Component: FinancialHealth', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [FinancialHealthComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([FinancialHealthComponent],
      (component: FinancialHealthComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(FinancialHealthComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(FinancialHealthComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-financial-health></app-financial-health>
  `,
  directives: [FinancialHealthComponent]
})
class FinancialHealthComponentTestController {
}

