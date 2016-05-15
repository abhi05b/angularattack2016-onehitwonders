import { Component, OnInit } from '@angular/core';

import { AccountService } from '../account/account.service';
import { Account } from '../account/account';
import { BudgetService } from '../budget/budget.service';
import { BadgeListComponent } from '../badge-list/badge-list.component';
 
@Component({
  moduleId: module.id,
  selector: 'app-budget',
  templateUrl: 'budget.component.html',
  styleUrls: ['budget.component.css'],
  directives: [BadgeListComponent]
})
export class BudgetComponent implements OnInit {

  constructor(private accountService: AccountService, private budgetService: BudgetService) {}
  model: any = {};
  accounts: Account[];
  ngOnInit() {
  	this.budgetService.getBudget().then(budget => this.model.budget = budget);
  	this.accountService.getExpenseAccount().then(expenseAccount => {
  		this.accountService.getChildrenAccounts(expenseAccount).then(childrenAccounts => {
  			this.accounts = childrenAccounts;
  		})
  	});
  }



}
