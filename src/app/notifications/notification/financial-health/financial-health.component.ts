import { Component, OnInit, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'financial-health',
  templateUrl: 'financial-health.component.html',
  styleUrls: ['financial-health.component.css']
})
export class FinancialHealthComponent implements OnInit {

	@Input()
	data: any;

  constructor() {}

  ngOnInit() {
  }

}
