import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { AlbuminService } from '../services/albumin/albumin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;

  constructor(public auth: AuthService, private albuminService: AlbuminService) { }

  ngOnInit() {
    this.auth.isLoggedIn.subscribe(isLogged => {
      if (isLogged) {
        this.getProfile();
      }
    });
  }

  async getProfile() {
    const response = await this.albuminService.getProfile();
    if (!response) {
      return;
    }

    this.username = response.data.display_name;
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }
}
