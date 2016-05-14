import { Injectable } from '@angular/core';

import { Account } from './account';
import { DataStoreService } from '../data-store/data-store.service';

@Injectable()
export class AccountService {

  constructor(private dataStoreService: DataStoreService) {}

  addAccount(account: Account){
  	return this.dataStoreService.addAccount(account);
  }

  deleteAccount(account: Account){
  	return this.dataStoreService.deleteAccount(account);
  }

  getAccounts(){
  	return this.dataStoreService.getAccounts();
  }
  
  getParentAccounts(){
    return this.getAccounts().then(accounts => {
        return accounts.filter(account => {
          return account.parent === undefined;
        })
      }
    );
  }

  getExpenseAccount(){
    return this.getAccountByName('Expenses');
  }

  getAssetsAccount(){
    return this.getAccountByName('Assets');
  }

  getLiabilityAccount(){
    return this.getAccountByName('Liability');
  }

  getCashAccount(){
    return this.getAccountByName('Cash');
  }

  getAccountByName(name: string){
    return this.getParentAccounts().then(accounts => accounts.find(account => account.name == name));
  }
}
