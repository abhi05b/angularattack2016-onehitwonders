import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { AccountService } from './account.service';

describe('Account Service', () => {
  beforeEachProviders(() => [AccountService]);

  it('should ...',
      inject([AccountService], (service: AccountService) => {
    expect(service).toBeTruthy();
  }));
});
