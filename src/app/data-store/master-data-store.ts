import { Transaction } from '../transaction/transaction';

import { Account } from '../account/account';
import { Tag } from '../tag/tag';
import { Badge } from '../badge/badge';

export class MasterDataStore {

	accounts: Account[]; 
	tags: Tag[]; 
	badges: Badge[];

	constructor(){
		this.populateAccountsAndBadges();
		this.populateTags();
	}

	populateAccountsAndBadges(){
		var assets = new Account('Assets',0);
		var expenses = new Account('Expenses',0);
		var liability = new Account('Liability',0);
		var income = new Account('Income',0);
		var cash = new Account('Cash', 0);
		var currentAccount = new Account('Current Account', 0,assets);
		var creditCard = new Account('Credit Card', 0,liability);
		var dining = new Account('Dining', 0,expenses);
		var travel = new Account('Travel', 0,expenses);
		var books = new Account('Books', 0,expenses);
		var magazines = new Account('Magazines', 0,expenses);
		var movies = new Account('Movies', 0, expenses);
		var fuel = new Account('Fuel', 0, expenses);
		var gym = new Account('Gym', 0, expenses);
		var gadgets = new Account('Gadgets', 0, expenses);
		var groceries = new Account('Groceries', 0, expenses);
		var health = new Account('Health', 0, expenses);
		var salary = new Account('Salary', 0,income);
		var foodieBadge = new Badge('Foodie',[dining], 0, 0);
		var firstTimerBadge = new Badge('Trend Setter', [], 0, 1);
		var travelerBadge = new Badge('Traveller', [travel],0, 0);
		var bookwormBadge = new Badge('Book Worm', [books, magazines],0, 0);
		var oilBaronBadge =  new Badge('Oil Baron', [fuel],0, 0);
		var movieBuff = new Badge('Movie Buff', [movies],0, 0);
		var homeMaker = new Badge('Home Maker', [groceries],0, 0);
		var hulk = new Badge('Gym Rat', [gym],0, 0);
		var mrRobot = new Badge('Mr. Robot', [gadgets],0, 0);
		this.accounts = [assets, expenses, liability, income, cash, currentAccount, creditCard, dining, travel, books, magazines, salary, movies, fuel, gym, gadgets, groceries, health];
		this.badges = [firstTimerBadge, foodieBadge, travelerBadge, bookwormBadge, oilBaronBadge, movieBuff, homeMaker, hulk, mrRobot];
	}

	populateTags(){
		var birthdayTag = new Tag('Birthday');
		var pizza = new Tag('Pizza');
		this.tags = [birthdayTag, pizza];
	}

}