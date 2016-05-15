import { Transaction } from '../transaction/transaction';
import { Injectable } from '@angular/core';

import { Account } from '../account/account';
import { Tag } from '../tag/tag';
import { Badge } from '../badge/badge';
import { Notification } from '../notifications/notificationDto';
import { MasterDataStore } from './master-data-store';
import { Guide } from '../guide/guide';

@Injectable()
export class DataStore {

	transactions: Transaction[]; 
	accounts: Account[]; 
	tags: Tag[]; 
	badges: Badge[];
	notifications: Notification[];
	guides: Guide[];
	budget: number;

	constructor(masterDataStore: MasterDataStore){
		this.transactions = [];
		this.accounts = masterDataStore.accounts;
		this.tags = masterDataStore.tags;
		this.badges = masterDataStore.badges;
		this.notifications = [];
		this.guides = [new Guide('firstTransaction')];
	}
}