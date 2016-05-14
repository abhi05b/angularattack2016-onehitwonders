import { Injectable } from '@angular/core';
import { Transaction } from '../transaction/transaction';
import { TransactionService } from '../transaction/transaction.service';
import { Account } from '../account/account';
import { Tag } from '../tag/tag';
import { MasterDataStore} from './master-data-store';
import { DataStoreService } from './data-store.service';
import { DataStore } from './data-store';
var assets = new Account('Assets',0);
var expenses = new Account('Expenses',0);
var liability = new Account('Liability',0);
var income = new Account('Income',0);
var currentAccount = new Account('Current Account', 0,assets);
var creditCard = new Account('Credit Card', 0,liability);
var dining = new Account('Dining', 0,expenses);
var travel = new Account('Travel', 0,expenses);
var books = new Account('Books', 0,expenses);
var magazines = new Account('Magazines', 0,expenses);
var salary = new Account('Salary', 0,income);
var birthdayTag = new Tag('Birthday');
export var DemoTransactions: Transaction[] = [
	new Transaction(new Date(2015, 11, 1), 'Pizza Hut',100.12, creditCard, dining, 'Birthday Celebrations', [birthdayTag]),	
	new Transaction(new Date(2015, 11, 1), 'Company A',1000, salary, currentAccount, 'Salary')
] 
@Injectable()
export class DemoData{
	constructor(private masterDataStore: MasterDataStore, private dataStoreService: DataStoreService, private transactionService: TransactionService){

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
		let transactions: Transaction[] = [new Transaction(new Date(2016,1,1), 'hCentive Inc.', 600000, salary, currentAccount, 'Salary!!!')
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
		, new Transaction(new Date(2016,1,15), 'Gold Gym', 50, creditCard, gym, 'Gym Membership')]
		let counter = 0;
		var promise = Promise.resolve();
		promise = transactions.reduce((prev, transaction) => prev.then(() => this.transactionService.createTransaction(transaction)), promise);
		return promise;
	}
}