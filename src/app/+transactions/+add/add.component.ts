import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/common';
import { Router } from '@angular/router';
import {TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap';

import { Tag } from '../../tag/tag';
import { TagService } from '../../tag/tag.service';
import { Transaction } from '../../transaction/transaction';
import { TransactionService } from '../../transaction/transaction.service';
import {TagInputComponent} from './../../tag-input/tag-input.component';

@Component({
  moduleId: module.id,
  selector: 'app-add',
  templateUrl: 'add.component.html',
  styleUrls: ['add.component.css'],
  directives: [TagInputComponent]
})
export class AddComponent implements OnInit {
 
 	model: Transaction;
 	tags: Tag[];

 	addTransaction(){
 		this.transactionService.createTransaction(this.model).then(() => this.router.navigate(['/transactions/list']));
 	}

  constructor(
  	private tagService: TagService, 
  	private transactionService: TransactionService, 
  	private router: Router
  	) {}

  ngOnInit() {
  	this.model = new Transaction();
  	this.tagService.getTags().then(tags => this.tags = tags);
  }

}
