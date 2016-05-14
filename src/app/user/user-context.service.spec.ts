import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { UserContextService } from './user-context.service';

describe('UserContext Service', () => {
  beforeEachProviders(() => [UserContextService]);

  it('should ...',
      inject([UserContextService], (service: UserContextService) => {
    expect(service).toBeTruthy();
  }));
});
