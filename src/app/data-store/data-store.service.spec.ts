import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { DataStoreService } from './data-store.service';

describe('DataStore Service', () => {
  beforeEachProviders(() => [DataStoreService]);

  it('should ...',
      inject([DataStoreService], (service: DataStoreService) => {
    expect(service).toBeTruthy();
  }));
});
