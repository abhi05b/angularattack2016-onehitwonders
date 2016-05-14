import { Component, OnInit, Input } from '@angular/core';

import { Notification } from '../notification';
import { BadgeComponent } from './badge/badge.component';

@Component({
  moduleId: module.id,
  selector: 'notification',
  templateUrl: 'notification.component.html',
  styleUrls: ['notification.component.css'],
  directives: [BadgeComponent]
})
export class NotificationComponent implements OnInit {

	@Input()
	notification: Notification;

  constructor() {}

  ngOnInit() {

  }

}
