import { Injectable } from '@angular/core';
import { CookieService } from './cookie.service';

const STORAGE_TOKEN_KEY = 'x-auth-token';

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
    return this.cookie.getCookie(STORAGE_TOKEN_KEY);
  }

  /**
   * This performs a redirect
   */
  login() {
    document.location.href = 'http://localhost:3000/auth/spotify?callback=http://localhost:4200/';
  }

  logout() {
    this.cookie.deleteCookie(STORAGE_TOKEN_KEY);
    this.checkIsLoggedIn();
  }
}
