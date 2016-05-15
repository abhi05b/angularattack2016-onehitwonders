import { Component, OnInit } from '@angular/core';

import { AccountService } from '../account/account.service';
import { Account } from '../account/account';
import { BudgetService } from '../budget/budget.service';
import { BadgeListComponent } from '../badge-list/badge-list.component';
import { GuideService } from '../guide/guide.service';
import { FinanceHealthIndicatorService } from '../finance-health-indicator/finance-health-indicator.service';

@Component({
  moduleId: module.id,
  selector: 'app-budget',
  templateUrl: 'budget.component.html',
  styleUrls: ['budget.component.css'],
  directives: [BadgeListComponent]
})
export class BudgetComponent implements OnInit {

  constructor(private accountService: AccountService, private budgetService: BudgetService, private guideService: GuideService, private financeHealthIndicatorService: FinanceHealthIndicatorService) {}
  model: any = {};
  accounts: Account[];
  editBudget: boolean = false;
  addBudget: boolean = false;
  budgetBreakup: any = {};
  expenseAccount: Account;
  ngOnInit() {
  	this.accountService.getExpenseAccount().then(expenseAccount => {
  		this.expenseAccount = expenseAccount;
  		this.accountService.getChildrenAccounts(expenseAccount).then(childrenAccounts => {
  			this.accounts = childrenAccounts;
  		})
  		.then( () => {
  			this.budgetService.getBudget().then(budget => {
		  		this.model.budget = budget
		  		if(budget === 0){
		  			this.addBudget = true;
		  			this.initBudgetBreakup();
		  		}
		  	});
  		})
  	});
  	
  }
  edit(){
  	this.initBudgetBreakup();
  	this.editBudget = true;
  }
  updateBudget(){
  	this.accounts.forEach(account => {
  		account.budget = this.budgetBreakup[account.name];
  	});
  	this.budgetService.setBudget(this.model.budget).then(() => {
  		this.guideService.trigger();
  		this.financeHealthIndicatorService.updateFinanceHealthIndicator();
  		this.editBudget = false;
  		this.addBudget = false;
  	});
  	
  }

  cancel(){
  	this.budgetService.getBudget().then(budget => this.model.budget = budget);
  	this.editBudget = false;
  }

  isExpenseLessThanBudget(){
  	if(this.expenseAccount){
  		return this.expenseAccount.amount < this.model.budget;
  	}
  	return false;
  }

  progressBarWidth(account: Account){
    let budget = account.budget;
    let amount = account.amount;
    if(amount <= budget){
      return amount/budget*100;
    }
    if(amount/budget > 2)
      return 100;
    return (budget - (amount % budget))/budget*100;
  }

  private initBudgetBreakup(){
  	this.accounts.forEach(account => {
  		this.budgetBreakup[account.name] = account.budget || 0;
  	});
  }
}
