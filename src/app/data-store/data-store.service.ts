import { Injectable } from '@angular/core';

import { Transaction } from '../transaction/transaction';

import { Account } from '../account/account';
import { Tag } from '../tag/tag';
import { Badge } from '../badge/badge';
import { Notification} from '../notifications/notificationDto';
import { DataStore} from './data-store';
import { MasterDataStore} from './master-data-store';


@Injectable()
export class DataStoreService {

	data: DataStore;
  masterDataStore: MasterDataStore;

  	constructor(masterDataStore: MasterDataStore, data: DataStore) {
      this.masterDataStore = masterDataStore;
      this.data = data;
  		
  	}

  	addTransaction(transaction: Transaction){
  		this.data['transactions'].push(transaction);
  		return Promise.resolve();
  	}

  	deleteTransaction(transaction: Transaction){
  		let index = this.data['transactions'].indexOf(transaction);
  		if(index > -1){
  			this.data['transaction'].splice(index, 1);
  		}
  		return Promise.resolve();
  	}

  	getTransactions(){
  		return Promise.resolve(this.data['transactions']);
  	}

  	addAccount(account: Account){
  		this.data.accounts.push(account);
  		return Promise.resolve();
  	}

  	deleteAccount(account: Account){
  		let index = this.data.accounts.indexOf(account);
  		if(index > -1){
  			this.data.accounts.splice(index, 1);
  		}
  		return Promise.resolve();
  	}

  	getAccounts(){
  		return Promise.resolve(this.data.accounts);
  	}

  	addTag(tag: Tag){
  		this.data.tags.push(tag);
  		return Promise.resolve();
  	}

  	deleteTag(tag: Tag){
  		let index = this.data.tags.indexOf(tag);
  		if(index > -1){
  			this.data.tags.splice(index, 1);
  		}
  		return Promise.resolve();
  	}

  	getTags(){
  		return Promise.resolve(this.data.tags);
  	}

  	addBadge(badge: Badge){
  		this.data.badges.push(badge);
  		return Promise.resolve();
  	}

  	deleteBadge(badge: Badge){
  		let index = this.data.badges.indexOf(badge);
  		if(index > -1){
  			this.data.badges.splice(index, 1);
  		}
  		return Promise.resolve();
  	}

  	getBadges(){
  		return Promise.resolve(this.data.badges); 
  	}

    getAllBadges(){
      return Promise.resolve(this.masterDataStore.badges);
    }

    addNotification(notification: Notification){
      this.data.notifications.push(notification);
      return Promise.resolve();
    }

    deleteNotification(notification: Notification){
      let index = this.data.notifications.indexOf(notification);
      if(index > -1){
        this.data.notifications.splice(index, 1);
      }
      return Promise.resolve();
    }

    getNotifications(){
      return Promise.resolve(this.data.notifications); 
    }

    setData(data: DataStore){
      this.data = data;
    }
}
