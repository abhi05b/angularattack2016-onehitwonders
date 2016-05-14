import { Component } from '@angular/core';
import { TransactionsComponent } from './+transactions';
import { Routes , ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';

import { DashboardComponent } from './+dashboard';
import { TagService } from './tag/tag.service';
import { TransactionService } from './transaction/transaction.service';

import { DataStore } from './data-store/data-store';
import { DataStoreService } from './data-store/data-store.service';

@Component({
  moduleId: module.id,
  selector: 'expense-management-app',
  templateUrl: 'expense-management.component.html',
  styleUrls: ['expense-management.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS, TagService, DataStoreService, DataStore, TransactionService]
})
@Routes([
  {path: '/transactions', component: TransactionsComponent},
  {path: '/dashboard', component: DashboardComponent}
])
export class ExpenseManagementAppComponent {
  title = 'expense-management works!';
}
