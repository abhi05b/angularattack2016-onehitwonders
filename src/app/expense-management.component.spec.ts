import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { ExpenseManagementAppComponent } from '../app/expense-management.component';

beforeEachProviders(() => [ExpenseManagementAppComponent]);

describe('App: ExpenseManagement', () => {
  it('should create the app',
      inject([ExpenseManagementAppComponent], (app: ExpenseManagementAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'expense-management works!\'',
      inject([ExpenseManagementAppComponent], (app: ExpenseManagementAppComponent) => {
    expect(app.title).toEqual('expense-management works!');
  }));
});
