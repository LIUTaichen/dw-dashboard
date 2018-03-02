import { Component, OnInit, Input } from '@angular/core';

import { Adal5Service } from 'adal-angular5';
import { adal } from 'adal-angular';


const config: adal.Config = {                           
  tenant: 'dempseywood.co.nz',                      
  clientId: '1fa7f23e-341d-40d8-b624-7e0ac2c329a9'    
}  

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {
  @Input() nodes: String[];
  @Input() user: string;
  constructor(private service: Adal5Service) {      
    this.service.init(config);    
    this.nodes = ['Home', 'Notifications'];
  }

  ngOnInit() {
    if(this.service.userInfo.authenticated){
      this.user =  this.service.userInfo.profile.name;
      console.log(this.service.userInfo.profile);
    }else{
      this.service.login();
    }
  }

  public logout() {
    this.service.logOut();
  }

  public login(){
    this.service.login();
    
  }

}
