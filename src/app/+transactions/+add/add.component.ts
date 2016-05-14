import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/common';
import { Router } from '@angular/router';
import {TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap';

import { Tag } from '../../tag/tag';
import { TagService } from '../../tag/tag.service';
import { Transaction } from '../../transaction/transaction';
import { TransactionService } from '../../transaction/transaction.service';

import { Account } from '../../account/account';
import { AccountService } from '../../account/account.service';


@Component({
  moduleId: module.id,
  selector: 'app-add',
  templateUrl: 'add.component.html',
  styleUrls: ['add.component.css']
})
export class AddComponent implements OnInit {
 
 	model: Transaction;
 	tags: Tag[];
  

 	addTransaction(){
      this.transactionService.createTransaction(this.model);
      
      console.log(this.model.from.name);  
      console.log(this.model.to.name);
      //this.toAccount.name = this.model.to;

      console.log(this.accountService.addAccount(this.model.from));
      console.log(this.accountService.addAccount(this.model.to));   
      this.accountService.isExistingAccount(this.model.from).then(result => console.log(result));      
 	}



  constructor(
  	private tagService: TagService, 
  	private transactionService: TransactionService, 
    private accountService: AccountService,
  	private router: Router
  	) {}

  ngOnInit() {
  	this.model = new Transaction();
  	this.tagService.getTags().then(tags => this.tags = tags);
  }

}
