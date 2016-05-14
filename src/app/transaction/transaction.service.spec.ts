import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { TransactionService } from './transaction.service';

describe('Transaction Service', () => {
  beforeEachProviders(() => [TransactionService]);

  it('should ...',
      inject([TransactionService], (service: TransactionService) => {
    expect(service).toBeTruthy();
  }));
});
