import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class RootGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    // I need this Guard to save extract the token from the querystring after the login
    this.authService.updateTokenFromQuery(next);

    if (this.authService.isLoggedIn.value) {
      this.router.navigate(['/albums']);

    } else {
      this.router.navigate(['/welcome']);
    }

    return false;
  }
}
