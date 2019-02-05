import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ActivatedRoute } from '@angular/router';
import { MatChipInputEvent } from '@angular/material';
import { AlbuminService } from '../albumin.service';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss']
})
export class AlbumDetailComponent implements OnInit {

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  albumId: string;
  album: any;
  tags = [];
  isSavedAlbum: boolean;
  isInListeningList: boolean;

  constructor(
    private route: ActivatedRoute,
    private albuminService: AlbuminService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.albumId = params['albumId'];
      console.log(`albumId ${this.albumId}`);

      this.getAlbum(this.albumId);
    });
  }

  getAlbum(albumId: string) {
    this.albuminService.getAlbum(albumId)
      .subscribe(response => {
        console.log(response.data);
        this.album = response.data.album;
        this.tags = response.data.tags;
        this.isSavedAlbum = response.data.isSavedAlbum;
        this.isInListeningList = response.data.isInListeningList;
      });
  }

  add(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tags.push({ name: value.trim() });
      this.addTag(value);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  async addTag(value: string) {
    try {
      const response = await this.albuminService.addTagToAlbum(value, this.albumId);
      console.log(`Insertion completed:`);
      console.log(response);

    } catch (error) {
      console.log('Error while adding tag');
      console.log(error);
    }
  }

  async remove(tag: any) {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
      this.removeTag(tag);
    }
  }

  async removeTag(tag: any) {
    try {
      const response = await this.albuminService.deleteTagFromAlbum(tag.name, this.albumId);
      console.log(`Delete completed:`);
      console.log(response);

    } catch (error) {
      console.log('Error while removing tag');
      console.log(error);
    }
  }

  async addToListeningList() {
    try {
      const response = await this.albuminService.addToListeningList(this.albumId);
      console.log(`Insertion completed:`);
      console.log(response);
      this.isInListeningList = true;

    } catch (error) {
      console.log('Error while adding to listening list');
      console.log(error);
    }
  }

  async removeFromListeningList() {
    try {
      const response = await this.albuminService.deleteFromListeningList(this.albumId);
      console.log(`Delete completed:`);
      console.log(response);
      this.isInListeningList = false;

    } catch (error) {
      console.log('Error while deleting from listening list');
      console.log(error);
    }
  }

  playInApp() {
    window.location.href = this.album.uri;
  }

  playInWeb() {
    window.open(this.album.external_urls.spotify);
  }
}
