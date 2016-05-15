import { Component, OnInit } from '@angular/core';
import {PAGINATION_DIRECTIVES} from 'ng2-bootstrap';
import {NG_TABLE_DIRECTIVES} from 'ng2-table/ng2-table';
import { Router } from '@angular/router';
//import {TableData} from './table-data';

import { TransactionService } from '../../transaction/transaction.service';
import { Transaction } from '../../transaction/transaction';
import { TableDataModel } from './tableDataModel';

@Component({
  moduleId: module.id,
  selector: 'app-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css'],
  directives: [NG_TABLE_DIRECTIVES, PAGINATION_DIRECTIVES]
})

export class ListComponent implements OnInit {
  transactions: Transaction[];
  dataModel: TableDataModel[];

  public rows: Array<any> = [];
  public columns: Array<any> = [
    { title: 'Merchant', name: 'merchant' },
    { title: 'Transaction Amount', name: 'amount', sort: false },
    { title: 'Date', name: 'date' },
    { title: 'From Account', name: 'from'},
    { title: 'To Account', name: 'to' },
    { title: 'Comments', name: 'comments' }
  ];
  public page: number = 1;
  public itemsPerPage: number = 10;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 0;

  public config: any = {
    paging: true,
    sorting: { columns: [] }
    //filtering: { filterString: '', columnName: 'position' }
  };


  private data: Array<any>;

  constructor(private transactionService: TransactionService, private router: Router) {    
  }

  ngOnInit() {
    
    this.transactionService.getTransactions().then(transactions => {
          this.transactions = transactions;
          if (transactions.length)
              this.formatTransactions(transactions);
      
    });
   
  }

  formatTransactions(transactions : Transaction[]){
    
      this.dataModel = transactions.map(transaction => {
        let t = new TableDataModel(transaction.date, transaction.merchant, transaction.amount, transaction.from.name, transaction.to.name, transaction.comments);        
        return t;
      });

    this.data = this.dataModel;
    if(this.data){
        this.length = this.data.length;
        this.onChangeTable(this.config, null);
      }
  }

  changePage(page: any, data: Array<any> = this.data): Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  changeSort(data: any, config: any) {
    if (!config.sorting) {
      return data;
    }

    // simple sorting
    return data.sort((previous: any, current: any) => {
      let columns = this.config.sorting.columns || [];
      for (let i = 0; i < columns.length; i++) {
        let columnName = columns[i].name;

        if (previous[columnName] > current[columnName]) {
          return columns[i].sort === 'desc' ? -1 : 1;
        }
        if (previous[columnName] < current[columnName]) {
          return columns[i].sort === 'asc' ? -1 : 1;
        }
      }
      return 0;
    });
  }

  changeFilter(data: any, config: any): any {
    if (!config.filtering) {
      return data;
    }

    let filteredData: Array<any> = data.filter((item: any) =>
      item[config.filtering.columnName].match(this.config.filtering.filterString));

    return filteredData;
  }

  onChangeTable(config: any, page: any = config.paging) {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }
    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }



  navigate(){
      this.router.navigate(['/transactions/add']);
  }


  // transactions: Transaction[];

  // constructor(private transactionService: TransactionService) { }

  // ngOnInit() {

  //   this.transactionService.getTransactions().then(transactions => this.transactions = transactions);

  // }

}
