import { Component, OnInit } from '@angular/core';

import { AccountService } from '../account/account.service';
import { Account } from '../account/account';
import { AccountCardComponent } from '../dashboard/account-card/account-card.component';

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

  constructor(accountService: AccountService) {
  	this.accountService = accountService;
  }

  ngOnInit() {
  	this.accountService.getParentAccounts().then(accounts => this.parentAccounts = accounts);

  }

}
