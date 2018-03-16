import { Injectable } from '@angular/core';
import { adal } from 'adal-angular';
import { Adal5Service } from 'adal-angular5';

const config: adal.Config = {                           
  tenant: 'dempseywood.co.nz',                      
  clientId: '1fa7f23e-341d-40d8-b624-7e0ac2c329a9'    
} 

@Injectable()
export class AuthService {

  constructor( private service: Adal5Service) {      
    this.service.init(config); 
  }

}
