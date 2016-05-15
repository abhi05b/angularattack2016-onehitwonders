import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES} from '@angular/router';

import { Guide } from './guide';
import { GuideService } from './guide.service';

@Component({
  moduleId: module.id,
  selector: 'guide',
  templateUrl: 'guide.component.html',
  styleUrls: ['guide.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class GuideComponent implements OnInit {

		guides: Guide[] = [];

  		constructor(private guideService: GuideService) {}

	  	ngOnInit() {

	  		this.guideService.getGuides().then(guides => {
	  			Array.prototype.push.apply(this.guides, guides);
	  		});

	  	}	

}
