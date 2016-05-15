import { Component, OnInit } from '@angular/core';

import { AccountService } from '../account/account.service';
import { Account } from '../account/account';
import { AccountCardComponent } from '../dashboard/account-card/account-card.component';
import { BadgeListComponent } from '../badge-list/badge-list.component';
import { FinanceHealthIndicatorComponent } from '../finance-health-indicator/finance-health-indicator.component';
import { GuideComponent } from '../guide/guide.component';

@Component({
  moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
  directives: [AccountCardComponent, BadgeListComponent, FinanceHealthIndicatorComponent, GuideComponent]
})
export class DashboardComponent implements OnInit {

	parentAccounts: Account[];
	accountService: AccountService;

  constructor(accountService: AccountService) {
  	this.accountService = accountService;
  }

  ngOnInit() {
    this.parentAccounts = [];
  	this.accountService.getParentAccounts().then(accounts => {
      Array.prototype.push.apply(this.parentAccounts, accounts)
    });
  }

}
