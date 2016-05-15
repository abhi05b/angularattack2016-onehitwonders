import { Component, OnInit } from '@angular/core';
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
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { BadgeService } from '../../badge/badge.service';

@Component({
  moduleId: module.id,
  selector: 'app-add',
  templateUrl: 'add.component.html',
  styleUrls: ['add.component.css'],
  directives: [TagInputComponent,TYPEAHEAD_DIRECTIVES]
})


/*export class Modal1 {
    constructor(public modal: Modal, viewContainer: ViewContainerRef) {
        modal.defaultViewContainer = viewContainer;
    }

    openAlert() {
        return this.modal.alert()
      .size('lg')
      .showClose(true)
      .title('A simple Alert style modal window')
      .open();
    }
}*/

export class AddComponent implements OnInit {
 
 	model: Transaction;
  dummyModel: Transaction;
 	tags: Tag[];
  _parentAccount: Account;
  

    addTransaction() {      
      let that = this;

      this.dummyModel = this.model;
      this.model = new Transaction();

    this.openModal();    

      this.accountService.getAccounts().then((_accounts) => {
        console.log("Accounts: 1", _accounts);
      });

      this.dummyModel.from.removeAmount(this.dummyModel.amount);
      this.dummyModel.to.addAmount(this.dummyModel.amount);

       this.updateAccounts(this,'from');
       this.updateAccounts(this, 'to');


      this.transactionService.createTransaction(this.dummyModel).then(() => {
        this.badgeService.processBadge(this.dummyModel);
        this.transactionService.getTransactions().then((_transactions) => {
          console.log("Transactions: ", _transactions);
        });
        this.accountService.getAccounts().then((_accounts) => {
          console.log("Accounts: ", _accounts);
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
          that.accountService.addAccount(that.dummyModel[accountType]).then(() => {
          });
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

  public getAsyncData(accountType:string,transactionType:string):Function {
    let accountFilter:string[];
    let includeFilter: boolean;
    if(accountType === 'from'){
      accountFilter=['Expenses'];
      includeFilter=false;
    }else{
      accountFilter=['Expenses'];
      includeFilter=true;
    }
    let that:any =this;
    let query = new RegExp(that.model[accountType].name, 'ig');
    let f:Function = function ():Promise<string[]>{
      let p:Promise<string[]> = that.accountService.getFilteredAccounts(accountFilter,includeFilter).then(accounts=>{
        return  accounts.map(account => {
          return account.name;
        }).filter(accountName => {
          let matches = accountName.match(query);
          return matches && matches.length>0;
        });
      });
      return p;
    };
    return f;
  }
  public typeaheadLoading:boolean = false;
  public typeaheadNoResults:boolean = false;
  public changeTypeaheadLoading(e:boolean):void {
    this.typeaheadLoading = e;
  }

  public changeTypeaheadNoResults(e:boolean):void {
    this.typeaheadNoResults = e;
  }


  public typeaheadOnSelect(e:any,accountType:string):void {
    setTimeout(() => this.model[accountType].name = e.item);
  }



  constructor(
  	private tagService: TagService, 
  	private transactionService: TransactionService, 
    private accountService: AccountService,
  	private router: Router,
    private modal: Modal,
    private badgeService: BadgeService  
  	) {}

  ngOnInit() {
  	this.model = new Transaction();
    this.dummyModel = new Transaction();
  	this.tagService.getTags().then(tags => this.tags = tags);

  }

  openModal(){
    return this.modal.alert()
      .size('lg')
      .showClose(true)
      .title('A simple Alert style modal window')
      .open();
  }

}  
