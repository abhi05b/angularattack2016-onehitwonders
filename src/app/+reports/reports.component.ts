import { Component, OnInit } from '@angular/core';
import {TagInputComponent} from './../tag-input/tag-input.component';
@Component({
  moduleId: module.id,
  selector: 'app-reports',
  templateUrl: 'reports.component.html',
  styleUrls: ['reports.component.css'],
  directives: [TagInputComponent]
})
export class ReportsComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
