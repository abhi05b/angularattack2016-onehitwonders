import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { DemoData } from '../data-store/demo-data';
import { UserContextService } from '../user/user-context.service';
import { User } from '../user/user';
import { GuideService } from '../guide/guide.service';
import { NotificationsService } from '../notifications/notifications.service';
import { BadgeService } from '../badge/badge.service';
import { Notification } from '../notifications/notificationDto';

@Component({
  moduleId: module.id,
  selector: 'landing-page',
  templateUrl: 'landing-page.component.html',
  styleUrls: ['landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private demoData: DemoData, private router: Router, private userContextService: UserContextService, private guideService: GuideService, private badgeService: BadgeService, private notificationService: NotificationsService) {}

  ngOnInit() {


  }

  goToDemo(){
    this.demoData.populateDemoData().then(() => {
    	this.userContextService.setUser(new User(true));
    	this.router.navigate(['/dashboard'])
    });
  }

  beginFlow(){
  	this.userContextService.setUser(new User());
    this.guideService.trigger().then(() => this.router.navigate(['/dashboard']));
  	this.badgeService.findBadge('Trend Setter').then(badge => {
      badge.count++;
      this.notificationService.addNotification(new Notification('badge', {name: badge.name}));
    })
  }

}
