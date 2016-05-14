import { Component } from '@angular/core';
import { TransactionsComponent } from './+transactions';
import { Routes , ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router} from '@angular/router';
import { ReportsComponent } from './+reports';
import { OverviewComponent } from './+overview';

import { DashboardComponent } from './+dashboard';
import { TagService } from './tag/tag.service';
import { TransactionService } from './transaction/transaction.service';

import { DataStore } from './data-store/data-store';
import { MasterDataStore } from './data-store/master-data-store';
import { DataStoreService } from './data-store/data-store.service';
import { DemoData } from './data-store/demo-data';
import { AccountService } from './account/account.service';
import { NotificationsService } from './notifications/notifications.service';
import { BadgeService } from './badge/badge.service';
import { FinanceHealthIndicatorService } from './finance-health-indicator/finance-health-indicator.service';

@Component({
  moduleId: module.id,
  selector: 'expense-management-app',
  templateUrl: 'expense-management.component.html',
  styleUrls: ['expense-management.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS, TagService, DataStoreService, DataStore, TransactionService, MasterDataStore, DemoData, AccountService, NotificationsService, BadgeService, FinanceHealthIndicatorService]
})
@Routes([
  {path: '/transactions', component: TransactionsComponent},
  {path: '/dashboard', component: DashboardComponent},
  {path: '/reports', component: ReportsComponent},
  {path: '/overview', component: OverviewComponent}
])
export class ExpenseManagementAppComponent {

  constructor(private demoData : DemoData, private router: Router){

  }
  title = 'expense-management works!';
  goToDemo(){
    this.demoData.populateDemoData().then(() => this.router.navigate(['/dashboard']));
  }
}
