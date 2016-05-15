import { Injectable } from '@angular/core';
import { DataStoreService } from '../data-store/data-store.service'
import { Guide } from './guide';

@Injectable()
export class GuideService {

  constructor(private dataStoreService: DataStoreService) {

  }

  getGuides(){
  	return this.dataStoreService.getGuides();
  }
  pushGuide(guide: Guide){
  	return this.dataStoreService.addGuide(guide);
  }
  removeGuide(guide: Guide){
  	return this.dataStoreService.deleteGuide(guide);
  }

}
