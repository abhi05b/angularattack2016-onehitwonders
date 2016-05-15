import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES} from '@angular/router';
import {TOOLTIP_DIRECTIVES} from 'ng2-bootstrap';

import { FinanceHealthIndicator} from './finance-health-indicator';
import { FinanceHealthIndicatorService} from './finance-health-indicator.service';

@Component({
  moduleId: module.id,
  selector: 'finance-health-indicator',
  templateUrl: 'finance-health-indicator.component.html',
  styleUrls: ['finance-health-indicator.component.css'],
  directives: [ROUTER_DIRECTIVES, TOOLTIP_DIRECTIVES]
})
export class FinanceHealthIndicatorComponent implements OnInit {

	financeHealthIndicator: FinanceHealthIndicator;
  constructor(private financeHealthIndicatorService: FinanceHealthIndicatorService) {}

  ngOnInit() {

  	this.financeHealthIndicator = this.financeHealthIndicatorService.financeHealthIndicator;

  }

}
