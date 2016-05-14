import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../transaction/transaction.service';
import { Transaction } from '../../transaction/transaction';

@Component({
  moduleId: module.id,
  selector: 'app-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css']
})
export class ListComponent implements OnInit {

	transactions: Transaction[];

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {

  	this.transactionService.getTransactions().then(transactions => this.transactions = transactions);

  }

}
