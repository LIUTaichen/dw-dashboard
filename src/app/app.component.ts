import { Component } from '@angular/core';

import { Adal5Service } from 'adal-angular5';
import { adal } from 'adal-angular';


const config: adal.Config = {                           
  tenant: 'dempseywood.co.nz',                      
  clientId: '1fa7f23e-341d-40d8-b624-7e0ac2c329a9'    
}    

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Dempsey Wood Portal';
  username: string;

  constructor(private service: Adal5Service) {      
    this.service.init(config);                      
  }    
  ngOnInit(){
    // Handle callback if this is a redirect from Azure
    this.service.handleWindowCallback();

    // Check if the user is authenticated. If not, call the login() method
    if (!this.service.userInfo.authenticated) {
      
    }else{

      // Log the user information to the console
      console.log('username ' + this.service.userInfo.username);
      this.username = this.service.userInfo.username;
      // console.log('authenticated: ' + this.service.userInfo.authenticated);

      // console.log('name: ' + this.service.userInfo.profile.name);

      // console.log('token: ' + this.service.userInfo.token);

      // console.log(this.service.userInfo.profile);
    }
  }

  // Logout Method
  public logout() {
    this.service.logOut();
  }

  public login(){
    this.service.login();
  }
}
