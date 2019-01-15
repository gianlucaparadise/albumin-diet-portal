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

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tags.push({ name: value.trim() });
      this.albuminService.addTagToAlbum(value, this.albumId).subscribe(response => console.log(`Insertion completed: ${response}`));
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag: any): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
      this.albuminService.deleteTagFromAlbum(tag.name, this.albumId).subscribe(response => console.log(`Delete completed: ${response}`));
    }
  }
}
