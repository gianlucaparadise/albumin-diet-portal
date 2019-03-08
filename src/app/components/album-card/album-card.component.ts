import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlbuminService } from '../../services/albumin/albumin.service';

@Component({
  selector: 'app-album-card',
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.scss']
})
export class AlbumCardComponent implements OnInit {

  @Input() albumDescriptor: any;
  canToggleListeningList = true;

  constructor(private router: Router, private albuminService: AlbuminService) { }

  ngOnInit() {
  }

  goToDetail(album) {
    // todo: use event emitter
    const albumId = album.id;
    this.router.navigate([`/album`, this.albumDescriptor.album.id]);
  }

  playAlbum(album, event: MouseEvent) {
    // todo: use event emitter
    event.stopPropagation();
    window.location.href = album.uri; // This opens the app
  }

  async toggleListeningList(event: MouseEvent) {
    event.stopPropagation();
    this.canToggleListeningList = false;
    if (this.albumDescriptor.isInListeningList) {
      await this.removeFromListeningList();
    } else {
      await this.addToListeningList();
    }
    this.canToggleListeningList = true;
  }

  async addToListeningList() {
    try {
      const response = await this.albuminService.addToListeningList(this.albumDescriptor.album.id);
      this.albumDescriptor.isInListeningList = true;

    } catch (error) {
      console.error('Error while adding to listening list');
      console.error(error);
    }
  }

  async removeFromListeningList() {
    try {
      const response = await this.albuminService.deleteFromListeningList(this.albumDescriptor.album.id);
      this.albumDescriptor.isInListeningList = false;

    } catch (error) {
      console.error('Error while deleting from listening list');
      console.error(error);
    }
  }

}
