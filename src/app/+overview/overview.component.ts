import { Component, OnInit } from '@angular/core';

import { AccountService } from '../account/account.service';

import { Account } from '../account/account';
import { Routes , ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router} from '@angular/router';
import {NgForm} from '@angular/common';

@Component({
  moduleId: module.id,
  selector: 'app-overview',
  templateUrl: 'overview.component.html',
  styleUrls: ['overview.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class OverviewComponent implements OnInit {

	accounts: any;
	parentAccounts: Account[];
  addAccount(accountName:string,parentAccount: Account){
    var that = this;
    var account = new Account(accountName,0,parentAccount);
    this.accountService.addAccount(account).then(function(){
      that.accounts = {};
    that.parentAccounts = [];
      that.accountService.getParentAccounts().then(parentAccounts => {
      Array.prototype.push.apply(that.parentAccounts, parentAccounts);
      parentAccounts.forEach(account => {
        that.accounts[account.name] = [];
      });
      that.accountService.getAccounts().then(accounts => {
        console.log(accounts.length);
        accounts.forEach(account => {
          let parentAccount = account.parent;
          if(parentAccount){
            that.accounts[parentAccount.name].push(account);
          }
        });
      });
    });
    });
    
    this.accounts[parentAccount.name].push(account);
  }
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
