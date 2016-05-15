import { Injectable } from '@angular/core';

import { FinanceHealthIndicator } from './finance-health-indicator';
import { AccountService } from '../account/account.service';
import { Notification } from '../notifications/notificationDto';
import { NotificationsService } from '../notifications/notifications.service';


@Injectable()
export class FinanceHealthIndicatorService {

	financeHealthIndicator: FinanceHealthIndicator = new FinanceHealthIndicator();

  	constructor(private accountService: AccountService , private notificationService: NotificationsService
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
		  			let finalHealth = 0;
		  			if(totalAssets === 0){
		  				if(liabilityAccountAmount === 0){
		  					finalHealth = -1;
		  				}
		  				else{
		  					finalHealth = 4;
		  				}
		  			}
		  			else{
		  				let percentage = Math.abs(liabilityAccountAmount)/totalAssets;
			  			if(0 <= percentage && percentage < 0.125){
			  				finalHealth = 0;
			  			}
			  			else if(0.125 <= percentage && percentage < 0.375){
			  				finalHealth = 1;
			  			}
			  			else if(0.375 <= percentage && percentage < 0.625){
			  				finalHealth = 2;
			  			}
			  			else if(0.625 <= percentage && percentage < 0.875){
			  				finalHealth = 3;
			  			}
			  			else if(0.875 <= percentage && percentage < 1){
			  				finalHealth = 4;
			  			}
			  			else {
			  				finalHealth = 4;
			  			}
		  			}
		  			
		  			if(initialHealth != finalHealth && finalHealth != -1){
		  				this.notificationService.addNotification(new Notification('financialHealth', {initialHealth: initialHealth, finalHealth:finalHealth}));
		  			}
		  			this.financeHealthIndicator.health = finalHealth;
  				})
  			})
  		});
  	}
}
