import { Component, OnInit } from '@angular/core';

import { Badge } from '../badge/badge';
import { BadgeService } from '../badge/badge.service';

@Component({
  moduleId: module.id,
  selector: 'badge-list',
  templateUrl: 'badge-list.component.html',
  styleUrls: ['badge-list.component.css']
})
export class BadgeListComponent implements OnInit {

	badgeList: Badge[];

  constructor(private badgeService: BadgeService) {

  }

  ngOnInit() {
  	this.badgeList = [];
  	this.badgeService.getAllBadges().then(badgeList => Array.prototype.push.apply(this.badgeList, badgeList));
  }

  getClassName(badgeName: string){
    return badgeName.trim().replace(' ', '_').toLowerCase();
  }

}
