import { Component, OnInit } from '@angular/core';

import { FinanceHealthIndicator} from './finance-health-indicator';
import { FinanceHealthIndicatorService} from './finance-health-indicator.service';

@Component({
  moduleId: module.id,
  selector: 'finance-health-indicator',
  templateUrl: 'finance-health-indicator.component.html',
  styleUrls: ['finance-health-indicator.component.css']
})
export class FinanceHealthIndicatorComponent implements OnInit {

	financeHealthIndicator: FinanceHealthIndicator;
  constructor(private financeHealthIndicatorService: FinanceHealthIndicatorService) {}

  ngOnInit() {

  	this.financeHealthIndicator = this.financeHealthIndicatorService.financeHealthIndicator;

  }

}
