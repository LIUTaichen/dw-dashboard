import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-installation-status-list',
  templateUrl: './installation-status-list.component.html',
  styleUrls: ['./installation-status-list.component.css']
})
export class InstallationStatusListComponent implements OnInit {
  @Input() plants: any[];
  constructor() { }

  ngOnInit() {
  }

  

}
