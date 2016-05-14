import { Component, OnInit } from '@angular/core';

import { AccountService } from '../account/account.service';

import { Account } from '../account/account';

@Component({
  moduleId: module.id,
  selector: 'app-overview',
  templateUrl: 'overview.component.html',
  styleUrls: ['overview.component.css']
})
export class OverviewComponent implements OnInit {

	accounts: any;
	parentAccounts: Account[];
  constructor(private accountService: AccountService) {}

  ngOnInit() {
  	this.accounts = {};
  	this.parentAccounts = [];
  	this.accountService.getParentAccounts().then(parentAccounts => {
  		Array.prototype.push.apply(this.parentAccounts, parentAccounts);
  		parentAccounts.forEach(account => {
  			this.accounts[account.name] = [];
  		});
  		this.accountService.getAccounts().then(accounts => {
  			accounts.forEach(account => {
  				let parentAccount = account.parent;
  				if(parentAccount){
  					this.accounts[parentAccount.name].push(account);
  				}
  			});
  		});
  	});
  	
  }

}
