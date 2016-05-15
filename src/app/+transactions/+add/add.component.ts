import { Component, OnInit, ViewChild  } from '@angular/core';
import {NgForm} from '@angular/common';
import { Router } from '@angular/router';
import {TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap';

import { Tag } from '../../tag/tag';
import { TagService } from '../../tag/tag.service';
import { Transaction } from '../../transaction/transaction';
import { TransactionService } from '../../transaction/transaction.service';
import {TagInputComponent} from './../../tag-input/tag-input.component';
import { Account } from '../../account/account';
import { AccountService } from '../../account/account.service';
import { Modal, TwoButtonPresetBuilder} from 'angular2-modal/plugins/bootstrap';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  moduleId: module.id,
  selector: 'app-add',
  templateUrl: 'add.component.html',
  styleUrls: ['add.component.css'],
  directives: [TagInputComponent, MODAL_DIRECTIVES]

})

export class AddComponent implements OnInit {
   
   @ViewChild('modal')
    modal: ModalComponent;

    saveModal() {
        this.modal.close().then(result => console.log('ok'));        
    }

    openModal() {      
        this.accountService.getParentAccounts().then(_accounts => {
          this.parentAccounts = _accounts;
        });
        this.modal.open().then(result => console.log('Open'));
    }

    dismissModal() {
        this.modal.close().then(result => console.log('Dismiss'));               
    }

    model: Transaction;
    dummyModel: Transaction;
    tags: Tag[];
    _parentAccount: Account;
    parentAccounts : Account[];
    fromParentSelect: Account;  
    toParentSelect: Account;
    fromAccountPresent: Boolean;
    toAccountPresent: Boolean;
    showFromAccountParents: Boolean;
    showToAccountParents: Boolean;
    toParentAccountsList: Account[];
    fromParentAccountsList: Account[];
    

    addTransaction() {
        let that = this;

        this.dummyModel = this.model;
        this.model = new Transaction();

        if(this.showFromAccountParents) {
            this.dummyModel.from.parent = this.fromParentSelect;
            this.dummyModel.from.removeAmount(this.dummyModel.amount)       
            this.accountService.addAccount(this.dummyModel.from).then((result) => { ; });
        }else{
            
            this.accountService.getAccount(this.dummyModel.from).then((_account)=> {
                this.dummyModel.from = _account;
                this.dummyModel.from.removeAmount(this.dummyModel.amount);
            });       
        }

        if (this.showToAccountParents) {
            this.dummyModel.to.parent = this.toParentSelect;
            this.dummyModel.to.addAmount(this.dummyModel.amount);   
            this.accountService.addAccount(this.dummyModel.to).then((result) => { ; });
        }else{
            this.accountService.getAccount(this.dummyModel.to).then((_account) => {
                this.dummyModel.to = _account;
                this.dummyModel.to.addAmount(this.dummyModel.amount);
            });
        }

        
       

          this.accountService.getAccounts().then((_accounts) => {
            console.log(_accounts);

            this.transactionService.createTransaction(this.model).then((result) => {

            this.accountService.getAccounts().then((_accounts) => {
              console.log(_accounts);
            });
          });
          });
        
    }

  onBlurFromMethod(account : Account) {
    if (!account.name)
      return;

    this.accountService.getAccount(account).then(_account => {
          if(!_account){
            this.accountService.getParentAccounts().then(_accounts => {
              this.fromParentAccountsList = _accounts;
              this.showFromAccountParents = true;
            });  
          }
    })
    
  }

  onBlurToMethod(account : Account) {
    if (!account.name)
      return;
    this.accountService.getAccount(account).then(_account => {
          if (!_account) {
        this.accountService.getParentAccounts().then(_accounts => {
          this.toParentAccountsList = _accounts;
          this.showToAccountParents = true;
        });
          }
    })
    
  }

  onFocusFromMethod(account: Account) {
     this.fromParentAccountsList = null;
     this.showFromAccountParents = false;
  }

  onFocusToMethod(account: Account) {
    this.toParentAccountsList = null;
    this.showToAccountParents = false;
  }

  constructor(
  	private tagService: TagService, 
  	private transactionService: TransactionService, 
    private accountService: AccountService,
  	private router: Router
  	) {}

  ngOnInit() {
  	this.model = new Transaction();
    this.dummyModel = new Transaction();
  	this.tagService.getTags().then(tags => this.tags = tags);

  }

  
}  
