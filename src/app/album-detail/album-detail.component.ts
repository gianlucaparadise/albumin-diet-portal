import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ActivatedRoute } from '@angular/router';
import { MatChipInputEvent } from '@angular/material';
import { AlbuminService } from '../albumin.service';
import { NavigationService } from '../services/navigation/navigation.service';

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
    private navigation: NavigationService,
    private route: ActivatedRoute,
    private albuminService: AlbuminService
  ) { }

  ngOnInit() {
    this.navigation.setTitle('');
    this.route.params.subscribe(params => {
      this.albumId = params['albumId'];

      this.getAlbum(this.albumId);
    });
  }

  getAlbum(albumId: string) {
    this.albuminService.getAlbum(albumId)
      .subscribe(response => {
        this.album = response.data.album;
        this.tags = response.data.tags;
        this.isSavedAlbum = response.data.isSavedAlbum;
        this.isInListeningList = response.data.isInListeningList;

        this.navigation.setTitle(this.album.name);
      });
  }

  async add(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      const tag = { name: value.trim() };
      this.tags.push(tag);

      const hasAdded = await this.addTag(value);
      if (!hasAdded) {
        const index = this.tags.indexOf(tag);
        this.tags.splice(index, 1);
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  async addTag(value: string): Promise<boolean> {
    try {
      const response = await this.albuminService.addTagToAlbum(value, this.albumId);
      return true;

    } catch (error) {
      console.error('Error while adding tag');
      console.error(error);
      return false;
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

    } catch (error) {
      console.error('Error while removing tag');
      console.error(error);
    }
  }

  async toggleListeningList() {
    if (this.isInListeningList) {
      await this.removeFromListeningList();
    } else {
      await this.addToListeningList();
    }
  }

  async addToListeningList() {
    try {
      const response = await this.albuminService.addToListeningList(this.albumId);
      this.isInListeningList = true;

    } catch (error) {
      console.error('Error while adding to listening list');
      console.error(error);
    }
  }

  async removeFromListeningList() {
    try {
      const response = await this.albuminService.deleteFromListeningList(this.albumId);
      this.isInListeningList = false;

    } catch (error) {
      console.error('Error while deleting from listening list');
      console.error(error);
    }
  }

  playInApp() {
    window.location.href = this.album.uri;
  }

  playInWeb() {
    window.open(this.album.external_urls.spotify);
  }
}
