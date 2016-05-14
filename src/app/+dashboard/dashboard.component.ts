import { Component, OnInit } from '@angular/core';

import { AccountService } from '../account/account.service';
import { Account } from '../account/account';
import { AccountCardComponent } from '../dashboard/account-card/account-card.component';
import { NotificationsService } from '../notifications/notifications.service';
import { Notification } from '../notifications/notification';

@Component({
  moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
  directives: [AccountCardComponent]
})
export class DashboardComponent implements OnInit {

	parentAccounts: Account[];
	accountService: AccountService;
	notificationsService: NotificationsService;
	notifications : Notification[];

  constructor(accountService: AccountService, notificationsService: NotificationsService) {
  	this.accountService = accountService;
  	this.notificationsService = notificationsService;
  }

  ngOnInit() {
  	this.accountService.getParentAccounts().then(accounts => this.parentAccounts = accounts);
  	this.notificationsService.getNotifications().then(notifications => this.notifications = notifications);

  }

}
