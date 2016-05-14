import { Injectable } from '@angular/core';

import {Notification} from './notification';
import { DataStoreService } from '../data-store/data-store.service';

@Injectable()
export class NotificationsService {

  constructor(private dataStoreService: DataStoreService) {}

  addNotification(notification: Notification){
  	return this.dataStoreService.addNotification(notification);
  }

  removeNotification(notification: Notification){
  	return this.dataStoreService.deleteNotification(notification);
  }

  getNotifications(){
  	return this.dataStoreService.getNotifications();
  }

}
