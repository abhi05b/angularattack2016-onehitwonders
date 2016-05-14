import { Injectable } from '@angular/core';

import { DataStoreService } from '../data-store/data-store.service';
import { Badge } from './badge';
import { AccountService } from '../account/account.service';

import { Transaction } from '../transaction/transaction';

@Injectable()
export class BadgeService {


  constructor(private dataStoreService: DataStoreService, private accountService: AccountService) {

  }

  addBadge(badge: Badge){
  	return this.dataStoreService.addBadge(badge);
  }

  deleteBadge(badge: Badge){
  	return this.dataStoreService.deleteBadge(badge);
  }

  getBadges(){
  	return this.dataStoreService.getBadges();
  }

  getAllBadges(){
    return this.dataStoreService.getAllBadges();
  }

  processBadge(transaction: Transaction){
    let account = transaction.to;
    this.getAllBadges().then(badges => {
      this.accountService.getExpenseAccount().then(expenseAccount => {
        let expenseAmount = expenseAccount.amount;
        let targetBadges = badges.filter(badge => badge.accounts.indexOf(account) > -1);
        targetBadges.forEach(badge => {
          badge.amount += transaction.amount;
          if(badge.amount/expenseAmount > 0.5)
            badge.count++;
            //this.addBadge(badge);
        });
      });
    });
  }

}
