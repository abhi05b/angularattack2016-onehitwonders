import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { TransactionsComponent } from './+transactions';
import { Routes , ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router} from '@angular/router';
import { ReportsComponent } from './+reports';
import { OverviewComponent } from './+overview';
import { BadgesComponent } from './+badges';

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
import { NotificationComponent } from './notifications/notification/notification.component';
import { Notification } from './notifications/notificationDto';
import { BS_MODAL_PROVIDERS , Modal} from 'angular2-modal/plugins/bootstrap';
import { Location } from '@angular/common';
import { GuideService } from './guide/guide.service';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UserContextService } from './user/user-context.service';

@Component({
  moduleId: module.id,
  selector: 'expense-management-app',
  templateUrl: 'expense-management.component.html',
  styleUrls: ['expense-management.component.css'],
  directives: [ROUTER_DIRECTIVES, NotificationComponent, LandingPageComponent],
  providers: [ROUTER_PROVIDERS, TagService, DataStoreService, DataStore, TransactionService, MasterDataStore, DemoData, AccountService, NotificationsService, BadgeService, FinanceHealthIndicatorService, BS_MODAL_PROVIDERS, Location, GuideService, LandingPageComponent, UserContextService]
})
@Routes([
  {path: '/transactions', component: TransactionsComponent},
  {path: '/dashboard', component: DashboardComponent},
  {path: '/reports', component: ReportsComponent},
  {path: '/overview', component: OverviewComponent},
  {path: '/badges', component: BadgesComponent}
])
export class ExpenseManagementAppComponent implements OnInit {

  constructor(private demoData: DemoData, public router: Router, public modal: Modal, viewContainer: ViewContainerRef, private notificationsService: NotificationsService, private location: Location) {
      modal.defaultViewContainer = viewContainer;
  }
  title = 'expense-management works!';
  notifications: Notification[];
  getLinkStyle(path) {
        return this.location.path() === path;
  }
  isLandingPage(){
      let currentPath = this.location.path();
      return currentPath === '' || currentPath === '/';
  }
  ngOnInit() {
    this.notificationsService.getNotifications().then(notifications => {
      this.notifications = notifications;
    })
  }
}
