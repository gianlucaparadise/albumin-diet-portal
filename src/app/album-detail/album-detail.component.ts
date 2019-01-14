import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbuminService } from '../albumin.service';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss']
})
export class AlbumDetailComponent implements OnInit {

  album: any;
  tags = [];

  constructor(
    private route: ActivatedRoute,
    private albuminService: AlbuminService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const albumId = params['albumId'];
      console.log(`albumId ${albumId}`);

      this.getAlbum(albumId);
    });
  }

  getAlbum(albumId: string) {
    this.albuminService.getAlbum(albumId)
      .subscribe(response => {
        console.log(response.data);
        this.album = response.data.album;
        this.tags = response.data.tags;
      });
  }
}
