import { Transaction } from '../transaction/transaction';
import { Account } from '../account/account';
import { Tag } from '../tag/tag';
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