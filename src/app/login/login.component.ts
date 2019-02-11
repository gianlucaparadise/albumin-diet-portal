import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AlbuminService } from '../albumin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;

  constructor(public auth: AuthService, private albuminService: AlbuminService) { }

  ngOnInit() {
    this.getProfile();
  }

  async getProfile() {
    const response = await this.albuminService.getProfile();
    this.username = response.data.display_name;
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }
}
