import { Injectable } from '@angular/core';
import { DataStoreService } from '../data-store/data-store.service'
import { Guide } from './guide';
import { TransactionService } from '../transaction/transaction.service';
import { BudgetService } from '../budget/budget.service';
import { AccountService } from '../account/account.service';

@Injectable()
export class GuideService {

  constructor(private dataStoreService: DataStoreService, private transactionService: TransactionService, private budgetService: BudgetService, private accountService: AccountService) {

  }

  getGuides(){
  	return this.dataStoreService.getGuides();
  }
  setGuide(guide: Guide){
  	return this.dataStoreService.setGuide(guide);
  }
  removeGuide(){
  	return this.dataStoreService.deleteGuides();
  }

  trigger(){
    this.transactionService.getTransactions().then(transactions =>{
      if(transactions.length === 0){
        this.setGuide(new Guide('firstTransaction'));
      }
      else{
        this.budgetService.getBudget().then(budget => {
          if(budget === 0){
            this.setGuide(new Guide('defineBudget'))
          }
          else{
            this.accountService.getExpenseAccount().then(expenseAccount => {
              this.accountService.getChildrenAccounts(expenseAccount).then(childrenAccounts => {
                let accountWithNoBudgetIndex = childrenAccounts.findIndex(account => account.budget === 0);
                if(accountWithNoBudgetIndex != -1){
                  this.setGuide(new Guide('defineExpenseCategoryBudget'));
                }
                else{
                  this.setGuide(new Guide(''));
                }
              })
            });
          }

        })
      }
    });

  }

}
