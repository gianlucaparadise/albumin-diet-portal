import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationService } from '../../services/navigation/navigation.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  title = ''; // Insert page title here

  constructor(
    private navigation: NavigationService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getTitle();
  }

  getTitle() {
    this.navigation.getTitleSubject()
      .subscribe(title => this.title = title);
  }

  goBack() {
    this.location.back();
  }
}
