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

  updateAccount(){
    return 'a';
  }

  isExistingAccount(account: Account){
    return this.getAccounts().
      then(accounts => accounts.findIndex(_account => _account.name === account.name))
      .then(index => index > -1);
  }

}
