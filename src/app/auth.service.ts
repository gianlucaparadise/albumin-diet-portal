import { Injectable } from '@angular/core';
import { CookieService } from './cookie.service';
import { environment } from './../environments/environment';

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
    const ENGINE_BASE_URL = environment.engineBaseUrl;
    const BASE_URL = environment.baseUrl;
    document.location.href = `${ENGINE_BASE_URL}/auth/spotify?callback=${BASE_URL}`;
  }

  logout() {
    this.cookie.deleteCookie(STORAGE_TOKEN_KEY);
    this.checkIsLoggedIn();
  }
}
