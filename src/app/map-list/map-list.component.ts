import { Component, OnInit, Input } from '@angular/core';
import { Plant } from '../plant';

@Component({
  selector: 'app-map-list',
  templateUrl: './map-list.component.html',
  styleUrls: ['./map-list.component.css']
})
export class MapListComponent implements OnInit {

  @Input() plants: Plant[];

  constructor() { }

  ngOnInit() {
  }

}
