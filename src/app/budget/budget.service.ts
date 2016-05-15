import { Injectable } from '@angular/core';

import { DataStoreService } from '../data-store/data-store.service';

@Injectable()
export class BudgetService {


  constructor(private dataStoreService: DataStoreService) {}

  getBudget(){
  	return this.dataStoreService.getBudget();
  }

  setBudget(budget: number){
  	return this.dataStoreService.setBudget(budget);
  }

}
