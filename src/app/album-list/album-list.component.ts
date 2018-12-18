import { Component, OnInit } from '@angular/core';
import { AlbuminService } from '../albumin.service';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss']
})
export class AlbumListComponent implements OnInit {

  albums = [];

  constructor(private albuminService: AlbuminService) { }

  ngOnInit() {
    this.getAlbums();
  }

  getAlbums() {
    this.albuminService.getAlbums()
      .subscribe(data => {
        this.albums = data.albums.items;
        // data.albums.items[0].
      });
  }

  goToDetail(album) {
    console.log(`detail: ${album.id}`);
  }

  playAlbum(album, event: MouseEvent) {
    event.stopPropagation();
    console.log(`play: ${album.external_urls.spotify}`);
  }
}
