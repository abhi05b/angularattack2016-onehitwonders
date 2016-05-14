import { Transaction } from '../transaction/transaction';
import { Account } from '../account/account';
import { Tag } from '../tag/tag';
var assets = new Account('Assets');
var expenses = new Account('Expenses');
var liability = new Account('Liability');
var income = new Account('Income');
var currentAccount = new Account('Current Account', assets);
var creditCard = new Account('Credit Card', liability);
var dining = new Account('Dining', expenses);
var travel = new Account('Travel', expenses);
var books = new Account('Books', expenses);
var magazines = new Account('Magazines', expenses);
var salary = new Account('Salary', income);
var birthdayTag = new Tag('Birthday');
export var DemoTransactions: Transaction[] = [
	new Transaction(new Date(2015, 11, 1), 'Pizza Hut',100.12, creditCard, dining, 'Birthday Celebrations', [birthdayTag]),	
	new Transaction(new Date(2015, 11, 1), 'Company A',1000, salary, currentAccount, 'Salary')
] 