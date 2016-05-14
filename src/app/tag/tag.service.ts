import { Injectable } from '@angular/core';

import { Tag } from './tag';
import { DataStoreService } from '../data-store/data-store.service';

@Injectable()
export class TagService {

  constructor(private dataStoreService: DataStoreService) {}

  addTag(tag: Tag){
  	return this.dataStoreService.addTag(tag);
  }

  deleteTag(tag: Tag){
  	return this.dataStoreService.deleteTag(tag);
  }

  getTags(){
  	return this.dataStoreService.getTags();
  }

}
