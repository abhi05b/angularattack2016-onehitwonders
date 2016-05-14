import { Injectable } from '@angular/core';
import { Transaction } from './transaction';
import { DataStoreService } from '../data-store/data-store.service';
@Injectable()
export class TransactionService {

  constructor(private dataStore: DataStoreService) {}

  createTransaction(transaction: Transaction){
  	return this.dataStore.addTransaction(transaction);
  }

  deleteTransaction(transaction: Transaction){
  	return this.dataStore.deleteTransaction(transaction);
  }

  getTransactions(){
  	return this.dataStore.getTransactions();
  }


}
