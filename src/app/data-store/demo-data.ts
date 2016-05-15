import { Injectable } from '@angular/core';
import { Transaction } from '../transaction/transaction';
import { TransactionService } from '../transaction/transaction.service';
import { Account } from '../account/account';
import { Tag } from '../tag/tag';
import { MasterDataStore} from './master-data-store';
import { DataStoreService } from './data-store.service';
import { DataStore } from './data-store';
import { BadgeService } from '../badge/badge.service';
import { BudgetService } from '../budget/budget.service';
import { GuideService } from '../guide/guide.service';

@Injectable()
export class DemoData{
	constructor(private masterDataStore: MasterDataStore, private dataStoreService: DataStoreService, private transactionService: TransactionService, private badgeService: BadgeService, private budgetService: BudgetService, private guideService: GuideService){

	}
	populateDemoData(){
		this.dataStoreService.setData(new DataStore(this.masterDataStore));
		let accounts = this.masterDataStore.accounts;
		let assets = accounts[0];
		let expenses = accounts[1];
		let liability = accounts[2];
		let income = accounts[3];
		let cash = accounts[4];
		let currentAccount = accounts[5];
		let creditCard = accounts[6];
		let dining = accounts[7];
		let travel = accounts[8];
		let books = accounts[9];
		let magazines = accounts[10];
		let salary = accounts[11];
		let movies = accounts[12];
		let fuel = accounts[13];
		let gym = accounts[14];
		let gadgets = accounts[15];
		let groceries = accounts[16];
		let health = accounts[17];
		let transactions: Transaction[] = [new Transaction(new Date(2016,1,1), 'hCentive Inc.', 10000, salary, currentAccount, 'Salary!!!')
		, new Transaction(new Date(2016,1,2), 'AMC Cinemas', 5, creditCard, movies, 'Batman vs Superman')
		, new Transaction(new Date(2016,1,2), 'TGIF', 30, creditCard, dining)
		, new Transaction(new Date(2016,1,3), 'Target', 20, creditCard, groceries, 'Vegetables, Milk, Eggs')
		, new Transaction(new Date(2016,1,4), 'Credit Card Bill', 10, currentAccount, creditCard)
		, new Transaction(new Date(2016,1,5), 'Apple Store', 599, creditCard, gadgets, 'Iphone 6s')
		, new Transaction(new Date(2016,1,5), 'Apple Store', 10, creditCard, gadgets, 'Iphone 6s cover')
		, new Transaction(new Date(2016,1,6), 'Harvard Business Review', 15, creditCard, magazines)
		, new Transaction(new Date(2016,1,7), 'Amazon', 30, creditCard, magazines, 'Continuos Integration')
		, new Transaction(new Date(2016,1,8), 'Booking.com', 3500, creditCard, travel, 'Mauritius hotel bookings and tickets', [new Tag('Mauritius')])
		, new Transaction(new Date(2016,1,14), 'Shell', 40, cash, fuel, 'Fuel', [new Tag('Chevy')])
		, new Transaction(new Date(2016,1,15), 'Gold Gym', 50, creditCard, gym, 'Gym Membership')
		, new Transaction(new Date(2016,1,16), 'Max Hospital', 1000, creditCard, health, 'Root Canal')]
		let counter = 0;
		var promise = Promise.resolve();
		promise = transactions.reduce((prev, transaction) => prev.then(() => {
			return this.transactionService.createTransaction(transaction).then(() => {
				let amount  = transaction.amount;
				transaction.from.removeAmount(amount);
				transaction.to.addAmount(amount);	
				this.badgeService.processBadge(transaction);
			});
		}), promise);
		dining.budget = 1000;
		magazines.budget = 100;
		books.budget = 100;
		movies.budget = 1000;
		fuel.budget = 100;
		groceries.budget = 700;
		return promise.then(() => {
			this.budgetService.setBudget(3000).then(() => {
				this.guideService.trigger();
			});
		}).then( () => {
			this.badgeService.findBadge('Trend Setter').then(badge => {
		      badge.count++;
		    });
		});
	}
}