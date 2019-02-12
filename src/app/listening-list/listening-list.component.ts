import { Component, OnInit } from '@angular/core';
import { AlbuminService } from '../albumin.service';
import { NavigationService } from '../services/navigation/navigation.service';

@Component({
  selector: 'app-listening-list',
  templateUrl: './listening-list.component.html',
  styleUrls: ['./listening-list.component.scss']
})
export class ListeningListComponent implements OnInit {

  albums = [];

  scrollContainerSelector = '.mat-sidenav-content';

  constructor(
    private navigation: NavigationService,
    private albuminService: AlbuminService
  ) { }

  ngOnInit() {
    this.navigation.setTitle('My Listening List');
    this.getAlbums();
  }

  async getAlbums() {
    try {
      const response = await this.albuminService.getListeningList();
      this.albums = response.data;

    } catch (error) {
      console.log('Error while getting listening list');
      console.log(error);
    }
  }

  /**
   * Here I append the next page
   */
  async onPageFinishing() {
    try {
      const offset = this.albums.length;
      const response = await this.albuminService.getListeningList(offset);
      this.albums.push(...response.data);

    } catch (error) {
      console.log('error while loading next page: ');
      console.log(error);
    }
  }
}
