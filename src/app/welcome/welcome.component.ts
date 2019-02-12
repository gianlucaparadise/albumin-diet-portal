import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation/navigation.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(
    private navigation: NavigationService
  ) { }

  ngOnInit() {
    this.navigation.setTitle('Welcome');
  }

}
