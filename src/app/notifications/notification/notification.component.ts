import { Component, OnInit, Input } from '@angular/core';

import { Notification } from '../notificationDto';
import { BadgeComponent } from './badge/badge.component';
import { FinancialHealthComponent } from './financial-health/financial-health.component';

import { NotificationsService } from '../notifications.service';

@Component({
  moduleId: module.id,
  selector: 'notifications',
  templateUrl: 'notification.component.html',
  styleUrls: ['notification.component.css'],
  directives: [BadgeComponent, FinancialHealthComponent]
})
export class NotificationComponent implements OnInit {

  @Input()
  notifications: Notification[];
  constructor() {}

  ngOnInit() {
  }

}
