import { Component, OnInit } from '@angular/core';

import { AccountService } from '../account/account.service';
import { Account } from '../account/account';
import { BudgetService } from '../budget/budget.service';
import { GuideService } from '../guide/guide.service';
 
@Component({
  moduleId: module.id,
  selector: 'app-budget',
  templateUrl: 'budget.component.html',
  styleUrls: ['budget.component.css']
})
export class BudgetComponent implements OnInit {

  constructor(private accountService: AccountService, private budgetService: BudgetService, private guideService: GuideService) {}
  model: any = {};
  accounts: Account[];
  editBudget: boolean = false;
  budgetBreakup: any = {};
  ngOnInit() {
  	this.budgetService.getBudget().then(budget => this.model.budget = budget);
  	this.accountService.getExpenseAccount().then(expenseAccount => {
  		this.accountService.getChildrenAccounts(expenseAccount).then(childrenAccounts => {
  			this.accounts = childrenAccounts;
  		})
  	});
  }
  edit(){
  	this.accounts.forEach(account => {
  		this.budgetBreakup[account.name] = account.budget;
  	});
  	this.editBudget = true;
  }
  updateBudget(){
  	this.accounts.forEach(account => {
  		account.budget = this.budgetBreakup[account.name];
  	});
  	this.budgetService.setBudget(this.model.budget).then(() => {
  		this.guideService.trigger();
  		this.editBudget = false;
  	});
  	
  }

  cancel(){
  	this.budgetService.getBudget().then(budget => this.model.budget = budget);
  	this.editBudget = false;
  }
}
