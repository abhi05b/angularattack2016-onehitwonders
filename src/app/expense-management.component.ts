import { Component, ViewContainerRef } from '@angular/core';
import { TransactionsComponent } from './+transactions';
import { Routes , ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';
import { ReportsComponent } from './+reports';

import { DashboardComponent } from './+dashboard';
import { TagService } from './tag/tag.service';
import { TransactionService } from './transaction/transaction.service';

import { DataStore } from './data-store/data-store';
import { DataStoreService } from './data-store/data-store.service';

import { AccountService } from './account/account.service';

import { BS_MODAL_PROVIDERS , Modal} from 'angular2-modal/plugins/bootstrap';


@Component({
  moduleId: module.id,
  selector: 'expense-management-app',
  templateUrl: 'expense-management.component.html',
  styleUrls: ['expense-management.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS, TagService, DataStoreService, DataStore, TransactionService, AccountService, BS_MODAL_PROVIDERS]
})
@Routes([
  {path: '/transactions', component: TransactionsComponent},
  {path: '/dashboard', component: DashboardComponent},
  {path: '/reports', component: ReportsComponent}
])

export class ExpenseManagementAppComponent {
  title = 'expense-management works!';

  constructor(public modal: Modal, viewContainer: ViewContainerRef) {
    modal.defaultViewContainer = viewContainer;
  }
}
