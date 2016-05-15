import { Component, OnInit, ViewChild  } from '@angular/core';
import {NgForm} from '@angular/common';
import { Router } from '@angular/router';
import {TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap';

import { Tag } from '../../tag/tag';
import { TagService } from '../../tag/tag.service';
import { Transaction } from '../../transaction/transaction';
import { TransactionService } from '../../transaction/transaction.service';

import { Account } from '../../account/account';
import { AccountService } from '../../account/account.service';
import { Modal, TwoButtonPresetBuilder} from 'angular2-modal/plugins/bootstrap';

import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';



@Component({
  moduleId: module.id,
  selector: 'app-add',
  templateUrl: 'add.component.html',
  directives: [MODAL_DIRECTIVES],
  styleUrls: ['add.component.css']
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
    fromAccount: Account;  
    toAccount: Account;
    fromAccountPresent: Boolean;
    toAccountPresent: Boolean;
    

    addTransaction() {           
      let that = this;

      this.dummyModel = this.model;
      this.model = new Transaction();           

      this.dummyModel.from.removeAmount(this.dummyModel.amount);
      this.dummyModel.to.addAmount(this.dummyModel.amount);
      this.fromAccount = this.dummyModel.from;
      this.toAccount = this.dummyModel.to;

      this.checkAccounts(this.fromAccount, this.toAccount);  

      this.transactionService.createTransaction(this.dummyModel).then(() => {

      });     
    }

    
    checkAccounts(fromAccount : Account, toAccount : Account){

    let that = this;

    that.accountService.getAccount(fromAccount).then(_account => {
      that.fromAccountPresent = !!_account;
      if (that.fromAccountPresent) {
      _account.addAmount(that.fromAccount.amount);
    that.fromAccount = _account;
      } 

      that.accountService.getAccount(toAccount).then(_account => {
        that.toAccountPresent = !!_account;

        if (!that.fromAccountPresent && !that.toAccountPresent) {
          that.openModal();
        }

      });


    });

        
    }

    updateAccounts(that, accountType){

          that.accountService.getAccount(that.dummyModel[accountType]).then((_account) => {
            if (_account) {
               _account.addAmount(that.dummyModel[accountType].amount);
                   that.dummyModel[accountType] = _account;
             
             //Updating the Parents
             that.updateParents(that.dummyModel[accountType], that.dummyModel[accountType].amount, accountType)
            }
            else {
              that.open();

              /*that.accountService.addAccount(that.dummyModel[accountType]).then(() => {
                   
              });*/
            }      
          });
    }


    updateParents(account: Account, amount, accountType) {

    this._parentAccount = account.parent;     
          while (this._parentAccount) {
            this._parentAccount.addAmount(amount);
              account = account.parent;
              this._parentAccount = account.parent;
          }
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

  getParents(){
    this.accountService.getParentAccounts().then(_accounts => console.log(_accounts));
  }
}  
