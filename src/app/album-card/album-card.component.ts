import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-album-card',
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.scss']
})
export class AlbumCardComponent implements OnInit {

  @Input() album: any;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToDetail(album) {
    // todo: use event emitter
    const albumId = album.id;
    this.router.navigate([`/album`, albumId]);
  }

  playAlbum(album, event: MouseEvent) {
    // todo: use event emitter
    event.stopPropagation();
    console.log(`play: ${album.external_urls.spotify}`);
  }

}
