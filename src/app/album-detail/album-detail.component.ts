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
    const response = await this.albuminService.addTagToAlbum(value, this.albumId);
    console.log(`Insertion completed:`);
    console.log(response);
  }

  async remove(tag: any) {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
      this.removeTag(tag);
    }
  }

  async removeTag(tag: any) {
    const response = await this.albuminService.deleteTagFromAlbum(tag.name, this.albumId);
    console.log(`Delete completed:`);
    console.log(response);
  }
}
