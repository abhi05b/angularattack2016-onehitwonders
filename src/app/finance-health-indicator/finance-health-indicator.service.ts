import { Injectable } from '@angular/core';

import { FinanceHealthIndicator } from './finance-health-indicator';
import { AccountService } from '../account/account.service';

@Injectable()
export class FinanceHealthIndicatorService {

	financeHealthIndicator: FinanceHealthIndicator = new FinanceHealthIndicator();

  	constructor(private accountService: AccountService) {
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
		  			if(totalAssets === 0){
		  				if(liabilityAccountAmount === 0){
		  					this.financeHealthIndicator.health = 2;
		  				}
		  				else{
		  					this.financeHealthIndicator.health = 4;
		  				}
		  			}
		  			let percentage = Math.abs(liabilityAccountAmount)/totalAssets;
		  			if(0 <= percentage && percentage < 0.125){
		  				this.financeHealthIndicator.health = 0;
		  			}
		  			else if(0.125 <= percentage && percentage < 0.375){
		  				this.financeHealthIndicator.health = 1;
		  			}
		  			else if(0.375 <= percentage && percentage < 0.625){
		  				this.financeHealthIndicator.health = 2;
		  			}
		  			else if(0.625 <= percentage && percentage < 0.875){
		  				this.financeHealthIndicator.health = 3;
		  			}
		  			else if(0.875 <= percentage && percentage < 1){
		  				this.financeHealthIndicator.health = 4;
		  			}
		  			else {
		  				this.financeHealthIndicator.health = 4;
		  			}
  				})
  			})
  		});
  	}
}
