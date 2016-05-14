import { Component, OnInit, Input } from '@angular/core';

import { Account } from '../../account/account';

@Component({
  moduleId: module.id,
  selector: 'account-card',
  templateUrl: 'account-card.component.html',
  styleUrls: ['account-card.component.css']
})
export class AccountCardComponent implements OnInit {

	@Input()
	account: Account;

  constructor() {}

  ngOnInit() {
  }

}
