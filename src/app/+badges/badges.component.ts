import { Component, OnInit } from '@angular/core';
import { BadgeService } from '../badge/badge.service';
import { Badge } from '../badge/badge';
import { BadgeListComponent } from '../badge-list/badge-list.component';
@Component({
  moduleId: module.id,
  selector: 'app-badges',
  templateUrl: 'badges.component.html',
  styleUrls: ['badges.component.css'],
  directives: [BadgeListComponent]
})
export class BadgesComponent implements OnInit {
	badgeList: Badge[];
  	constructor(private badgeService: BadgeService) {}

	ngOnInit() {
		this.badgeList = [];
  		this.badgeService.getAllBadges().then(badgeList => Array.prototype.push.apply(this.badgeList, badgeList));
	}

	getClassName(badgeName: string){
    	return badgeName.trim().replace(' ', '_').toLowerCase();
  	}

}
