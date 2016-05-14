import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { FinanceHealthIndicatorService } from './finance-health-indicator.service';

describe('FinanceHealthIndicator Service', () => {
  beforeEachProviders(() => [FinanceHealthIndicatorService]);

  it('should ...',
      inject([FinanceHealthIndicatorService], (service: FinanceHealthIndicatorService) => {
    expect(service).toBeTruthy();
  }));
});
