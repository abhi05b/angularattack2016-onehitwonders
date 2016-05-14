import { Injectable } from '@angular/core';

import { DataStoreService } from '../data-store/data-store.service';
import { Badge } from './badge';

@Injectable()
export class BadgeService {

  constructor(private dataStoreService: DataStoreService) {}

  addBadge(badge: Badge){
  	return this.dataStoreService.addBadge(badge);
  }

  deleteBadge(badge: Badge){
  	return this.dataStoreService.deleteBadge(badge);
  }

  getBadges(){
  	return this.dataStoreService.getBadges();
  }

}
