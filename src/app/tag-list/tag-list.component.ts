import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AlbuminService } from '../albumin.service';
import { Tag } from '../models/Tag';
import { MatChip, MatChipList } from '@angular/material';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss'],
})
export class TagListComponent implements OnInit {

  @ViewChild('tagList') tagList: MatChipList;
  tags: Tag[] = [];

  constructor(
    private albuminService: AlbuminService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getTags();
  }

  getTags(): void {
    this.albuminService.getTags()
      .subscribe(allTags => this.tags = allTags);
  }

  onTagClick(tag: Tag, chip: MatChip): void {
    // tag.selected = !tag.selected;
    chip.toggleSelected();
    this.onChange();
  }

  onChange() {
    const selectedChip = <MatChip>this.tagList.selected;

    const selectedTagNames = [];
    if (selectedChip) {
      selectedTagNames.push((<string>selectedChip.value).trim());
    }

    // todo: retrieve selected tag names using bound models instead of html values
    //// I get only the names of the selected tags
    // const selectedTagNames = this.tags.reduce((names, tag) => {
    //   if (tag.selected) {
    //     names.push(tag.name);
    //   }
    //   return names;
    // }, <string[]>[]);

    const params = { tags: selectedTagNames };
    this.router.navigate(['/albums'], { queryParams: params });
  }
}
