import { Component, OnInit, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'badge',
  templateUrl: 'badge.component.html',
  styleUrls: ['badge.component.css']
})
export class BadgeComponent implements OnInit {

	@Input()
	data: any;

  constructor() {}

  ngOnInit() {
  }

}
