import { Injectable } from '@angular/core';
import { CanActivate }    from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate{

  canActivate() {
    console.log('AuthGuard#canActivate called');
    console.log('AuthGuard#returning false');
    return false;
  }
  constructor() { }

}
