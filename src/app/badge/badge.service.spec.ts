import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { BadgeService } from './badge.service';

describe('Badge Service', () => {
  beforeEachProviders(() => [BadgeService]);

  it('should ...',
      inject([BadgeService], (service: BadgeService) => {
    expect(service).toBeTruthy();
  }));
});
