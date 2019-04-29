import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ActivatedRouteSnapshot } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

const STORAGE_TOKEN_KEY = 'x-auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = new BehaviorSubject(false);

  constructor() {
    this.checkIsLoggedIn();
  }

  /**
   * When the login ends, the backend redirects to the home page with a token in querystring.
   * This extracts and saves the token from the querystring.
   * @returns `true` if a token has been found
   */
  public updateTokenFromQuery(routeSnapshot: ActivatedRouteSnapshot): boolean {
    const params = routeSnapshot.queryParams;
    const authToken = params[STORAGE_TOKEN_KEY];

    if (!authToken) {
      return false;
    }

    this.token = authToken;
    return true;
  }

  /**
   * After every rest call, the backend refreshes the token and sends it in the headers.
   * This extracts and saves the token from the headers.
   * @returns `true` if a token has been found
   */
  public updateTokenFromHeaders(response: HttpResponse<any>): boolean {
    const token = response.headers.get(STORAGE_TOKEN_KEY);

    if (!token) {
      return false;
    }

    this.token = token;
    return true;
  }

  private checkIsLoggedIn() {
    const token = this.token;
    const isLoggedIn = (typeof token !== 'undefined' && token != null && token.trim() !== '');
    if (isLoggedIn !== this.isLoggedIn.value) {
      this.isLoggedIn.next(isLoggedIn);
    }
  }

  get token() {
    return localStorage.getItem(STORAGE_TOKEN_KEY);
  }

  set token(value: string) {
    localStorage.setItem(STORAGE_TOKEN_KEY, value);
    this.checkIsLoggedIn();
  }

  /**
   * This performs a redirect
   */
  login() {
    const ENGINE_BASE_URL = environment.engineBaseUrl;

    const parsedUrl = new URL(window.location.href);
    const BASE_URL = parsedUrl.origin;

    document.location.href = `${ENGINE_BASE_URL}/auth/spotify?callback=${BASE_URL}`;
  }

  logout() {
    localStorage.removeItem(STORAGE_TOKEN_KEY);
    this.checkIsLoggedIn();
  }
}
