import { Component, OnInit } from '@angular/core';
import { AlbuminService } from '../albumin.service';
import { Tag } from '../models/Tag';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss'],
})
export class TagListComponent implements OnInit {

  tags: Tag[] = [];

  constructor(private albuminService: AlbuminService) { }

  ngOnInit() {
    this.getTags();
  }

  getTags(): void {
    this.albuminService.getTags()
      .subscribe(tags => this.tags = tags);
  }
}
