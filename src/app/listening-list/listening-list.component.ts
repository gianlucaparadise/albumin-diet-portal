import { Component, OnInit } from '@angular/core';
import { AlbuminService } from '../albumin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-listening-list',
  templateUrl: './listening-list.component.html',
  styleUrls: ['./listening-list.component.scss']
})
export class ListeningListComponent implements OnInit {

  albums = [];

  constructor(
    private albuminService: AlbuminService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
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
}
