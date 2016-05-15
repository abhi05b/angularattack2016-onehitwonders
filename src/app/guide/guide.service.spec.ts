import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { GuideService } from './guide.service';

describe('Guide Service', () => {
  beforeEachProviders(() => [GuideService]);

  it('should ...',
      inject([GuideService], (service: GuideService) => {
    expect(service).toBeTruthy();
  }));
});
