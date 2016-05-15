import { Component, OnInit } from '@angular/core';
import { AddComponent } from './+add';
import { Routes , ROUTER_DIRECTIVES} from '@angular/router';
import { ListComponent } from './+list';
import { BadgeListComponent } from '../badge-list/badge-list.component';

@Component({
  moduleId: module.id,
  selector: 'app-transactions',
  templateUrl: 'transactions.component.html',
  styleUrls: ['transactions.component.css'],
  directives: [ROUTER_DIRECTIVES, BadgeListComponent]
})
@Routes([
  {path: '/add', component: AddComponent},
  {path: '/list', component: ListComponent}
])
export class TransactionsComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
