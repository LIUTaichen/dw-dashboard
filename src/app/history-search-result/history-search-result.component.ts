import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-history-search-result',
  templateUrl: './history-search-result.component.html',
  styleUrls: ['./history-search-result.component.css']
})
export class HistorySearchResultComponent implements OnInit {

  @Input() result: any;
  @Input() loading: boolean;
  constructor() { }

  ngOnInit() {
  }

}
