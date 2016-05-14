import { Transaction } from '../transaction/transaction';

import { Account } from '../account/account';
import { Tag } from '../tag/tag';
import { Badge } from '../badge/badge';
import { Notification } from '../notifications/notification';

export class DataStore {

	transactions: Transaction[]; 
	accounts: Account[]; 
	tags: Tag[]; 
	badges: Badge[];
	notifications: Notification[];

	constructor(){
		this.transactions = [];
		this.accounts = [];
		this.tags = [];
		this.badges = [];
		this.notifications = [];
	}
}