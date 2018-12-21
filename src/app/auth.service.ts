import { Injectable } from '@angular/core';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;

  constructor(private cookie: CookieService) {
    this.checkIsLoggedIn();
  }

  private checkIsLoggedIn() {
    const token = this.token;
    this.isLoggedIn = (typeof token !== 'undefined' && token != null && token.trim() !== '');
  }

  get token() {
    return this.cookie.getCookie('x-auth-token');
  }
}
