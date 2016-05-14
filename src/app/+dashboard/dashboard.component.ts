import { Component, OnInit } from '@angular/core';

import { AccountService } from '../account/account.service';
import { Account } from '../account/account';
import { AccountCardComponent } from '../dashboard/account-card/account-card.component';
import { NotificationsService } from '../notifications/notifications.service';
import { Notification } from '../notifications/notification';
import { BadgeListComponent } from '../badge-list/badge-list.component'

@Component({
  moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
  directives: [AccountCardComponent, BadgeListComponent]
})
export class DashboardComponent implements OnInit {

	parentAccounts: Account[];
	accountService: AccountService;
	notificationsService: NotificationsService;
	notifications : Notification[] = [];

  constructor(accountService: AccountService, notificationsService: NotificationsService) {
  	this.accountService = accountService;
  	this.notificationsService = notificationsService;
  }

  ngOnInit() {
    this.parentAccounts = [];
  	this.accountService.getParentAccounts().then(accounts => {
      Array.prototype.push.apply(this.parentAccounts, accounts)
    });
  	this.notificationsService.getNotifications().then(notifications => Array.prototype.push.apply(this.notifications, notifications));

  }

}
