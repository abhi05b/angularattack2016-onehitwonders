import { Injectable } from '@angular/core';

import { FinanceHealthIndicator } from './finance-health-indicator';
import { AccountService } from '../account/account.service';
import { Notification } from '../notifications/notificationDto';
import { NotificationsService } from '../notifications/notifications.service';
import { BudgetService } from '../budget/budget.service';


@Injectable()
export class FinanceHealthIndicatorService {

	financeHealthIndicator: FinanceHealthIndicator = new FinanceHealthIndicator();

  	constructor(private accountService: AccountService , private notificationService: NotificationsService, private budgetService: BudgetService
  		) {
  		this.updateFinanceHealthIndicator();
  	}

  	updateFinanceHealthIndicator() {
  		return this.accountService.getLiabilityAccount().then(liabilityAccount => {
  			this.accountService.getAssetsAccount().then(assetsAccount => {
  				this.accountService.getCashAccount().then(cashAccount => {
  					let liabilityAccountAmount = liabilityAccount.amount;
		  			let assetsAccountAmount = assetsAccount.amount;
		  			let cashAccountAmount = cashAccount.amount;
		  			let totalAssets = assetsAccountAmount + cashAccountAmount;
		  			let initialHealth = this.financeHealthIndicator.health;
		  			let liabilityHealth = this.getRating(totalAssets, liabilityAccountAmount);
		  			
		  			this.budgetService.getBudget().then( budget => {
		  				this.accountService.getExpenseAccount().then(expenseAccount => {
		  					let expenseAmount = expenseAccount.amount;
		  					let budgetHealth = this.getRating(budget, expenseAmount);
		  					let finalHealth = Math.max(budgetHealth, liabilityHealth);
		  					if(initialHealth != finalHealth && finalHealth != -1){
				  				this.notificationService.addNotification(
				  					new Notification('financialHealth', {initialHealth: initialHealth, finalHealth:finalHealth, budgetHealth:budgetHealth,liabilityHealth:liabilityHealth}));
				  			}
				  			this.financeHealthIndicator.health = finalHealth;
				  			this.financeHealthIndicator.budgetHealth = budgetHealth;
				  			this.financeHealthIndicator.liabilityHealth = liabilityHealth;
		  				});
		  			});
		  			
		  			
  				})
  			})
  		});
  	}

  	private getRating(base: number, quotient: number){
  		let rating = -1;
  		if(base === 0){
  			if(quotient != 0){
  				rating = 4;
  			}
  		}
  		else{
  			let percentage = Math.abs(quotient)/base;
    			if(0 <= percentage && percentage < 0.125){
    				rating = 0;
    			}
    			else if(0.125 <= percentage && percentage < 0.375){
    				rating = 1;
    			}
    			else if(0.375 <= percentage && percentage < 0.625){
    				rating = 2;
    			}
    			else if(0.625 <= percentage && percentage < 0.875){
    				rating = 3;
    			}
    			else if(0.875 <= percentage && percentage < 1){
    				rating = 4;
    			}
    			else {
    				rating = 4;
    			}
  		}
		return rating;
  	}
}
