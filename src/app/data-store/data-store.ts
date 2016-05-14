import { Transaction } from '../transaction/transaction';

import { Account } from '../account/account';
import { Tag } from '../tag/tag';
import { Badge } from '../badge/badge';
import { Notification } from '../notifications/notification';
import { MasterDataStore } from './master-data-store';

export class DataStore {

	transactions: Transaction[]; 
	accounts: Account[]; 
	tags: Tag[]; 
	badges: Badge[];
	notifications: Notification[];

	constructor(masterDataStore: MasterDataStore){
		this.transactions = [];
		this.accounts = masterDataStore.accounts;
		this.tags = masterDataStore.tags;
		this.badges = [];
		this.notifications = [];
	}
}