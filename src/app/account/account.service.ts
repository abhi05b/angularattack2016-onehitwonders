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

  getFilteredAccounts(filterByAccounts: string[], include: boolean){
    if(!filterByAccounts || filterByAccounts.length===0){
      return this.getAccounts();
    }
    let filteredAccunts = [];
    return this.getAccounts().then(accounts => {
      return accounts.filter(account => {
        if(filterByAccounts.indexOf(account.name)>-1 ||
            (account.parent && filterByAccounts.indexOf(account.parent.name)>-1)
          ){
          return include;
        }else{
          return !include;
        }
      });
    });
  }

  isExistingAccount(account: Account){
    return this.getAccounts().
      then(accounts => accounts.findIndex(_account => _account.name === account.name))
      .then(index => index > -1);
  }
  
  getParentAccounts(){
    return this.getAccounts().then(accounts => {
        return accounts.filter(account => {
          return account.parent === undefined;
        })
      }
    );
  }

  getChildrenAccounts(parentAccount: Account){
    return this.getAccounts().then(accounts => {
      return accounts.filter(account => {
        return account.parent === parentAccount;
      })
    });
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

  updateAccount(account : Account){

  }

  getAccount(account : Account){
    return this.getAccounts().
      then(accounts => accounts.find(_account => _account.name === account.name));           
  }
}
