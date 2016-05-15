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
import { BadgeService } from '../../badge/badge.service';
import { GuideService } from '../../guide/guide.service';
import { FinanceHealthIndicatorService } from '../../finance-health-indicator/finance-health-indicator.service';


declare var jQuery: any;

@Component({
  moduleId: module.id,
  selector: 'app-add',
  templateUrl: 'add.component.html',
  styleUrls: ['add.component.css'],
  directives: [TagInputComponent,TYPEAHEAD_DIRECTIVES]
})

export class AddComponent implements OnInit {

    model: Transaction;
    dummyModel: Transaction;
    tags: Tag[];
    fromAccountPresent: Boolean;
    toAccountPresent: Boolean;
    showfromAccountParents: Boolean;
    showtoAccountParents: Boolean;
    toParentAccountsList: Account[];
    fromParentAccountsList: Account[];
    fromParentSelect: Account;
    toParentSelect: Account;
    tagsList: string[] = [];

    addTransaction() {
      let that = this;

      this.dummyModel = this.model;
      this.model = new Transaction();

    if (this.showfromAccountParents) {
          this.dummyModel.from.parent = this.fromParentSelect;          
            this.dummyModel.from.removeAmount(this.dummyModel.amount);             
              this.accountService.addAccount(this.dummyModel.from).then(() => {
                  this.updateAccount();    
              });

      } else {
      
        this.accountService.getAccount(this.dummyModel.from).then((_account) => {
          this.dummyModel.from = _account;
            this.dummyModel.from.removeAmount(this.dummyModel.amount);
                  this.updateAccount();    
              });
      }
    }


    updateAccount(){
    let that = this;

    if (that.showtoAccountParents) {
      that.dummyModel.to.parent = that.toParentSelect;          
      that.dummyModel.to.addAmount(that.dummyModel.amount);             
      that.accountService.addAccount(that.dummyModel.to).then(() => {
          that.addNewTransaction();
      });

    } else {

      that.accountService.getAccount(that.dummyModel.to).then((_account) => {
        that.dummyModel.to = _account;
        that.dummyModel.to.addAmount(that.dummyModel.amount);
          that.addNewTransaction();    
      });
    }
      this.tagsList=[];
    }

   addNewTransaction(){
     let that = this;
     
     that.transactionService.createTransaction(that.dummyModel).then((result) => {
       that.guideService.trigger();
       that.badgeService.processBadge(that.dummyModel);
       that.financehealthIndicatorService.updateFinanceHealthIndicator();
       that.transactionService.getTransactions().then((_transactions => console.log(_transactions)));
       that.clearList('to');
       that.clearList('from');
       that.router.navigate(['/transactions/list']);
     });
   }
   
  onBlurMethod( type : string) {
    if (jQuery('typeahead-container').length === 0) {
        this.handleParentSelectBox( type);
    }      
  }

  handleParentSelectBox(type : string){
    let that = this;
    let index;

    if (!that.model[type].name)
      return;
    that.accountService.getAccount(that.model[type]).then(_account => {
          if (!_account) {
              that.accountService.getParentAccounts().then(_accounts => {
                
                if(type === 'to'){
                    index = _accounts.findIndex((_account => _account.name === 'Income'));
                    _accounts.splice(index, 1);
                }else{
                    index = _accounts.findIndex((_account => _account.name === 'Expenses'));
                    _accounts.splice(index, 1);
                }
                  
                that[type + 'ParentAccountsList'] = _accounts;
                that['show' + type + 'AccountParents'] = true;
                
              });
          }
          else{
              that.clearList(type);
          }
    })

  }


  clearList(type : string) {
    this[type + 'ParentAccountsList'] = null;
    this['show' + type + 'AccountParents'] = false;
    this[type + 'ParentSelect'] = null;
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
    setTimeout(() => {
      this.model[accountType].name = e.item;
      this.handleParentSelectBox(accountType);
    }  
    );
  }


  navigate(){
     this.router.navigate(['/transactions/list']);
        }
 

  constructor(
  	private tagService: TagService, 
  	private transactionService: TransactionService, 
    private accountService: AccountService,
  	private router: Router,
    private modal: Modal,
    private badgeService: BadgeService,
    private guideService: GuideService,
    private financehealthIndicatorService: FinanceHealthIndicatorService
  	) {}

  ngOnInit() {
  	this.model = new Transaction();
    this.dummyModel = new Transaction();
  	this.tagService.getTags().then(tags => this.tags = tags);
      console.log(this.dummyModel);
       }

  
}  
