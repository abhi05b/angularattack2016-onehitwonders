import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { BudgetService } from './budget.service';

describe('Budget Service', () => {
  beforeEachProviders(() => [BudgetService]);

  it('should ...',
      inject([BudgetService], (service: BudgetService) => {
    expect(service).toBeTruthy();
  }));
});
