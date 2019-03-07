import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AlbuminService } from '../albumin.service';
import { MatChip, MatChipList } from '@angular/material';
import { ITag } from 'albumin-diet-types';

const UNTAGGED_NAME = 'Untagged';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss'],
})
export class TagListComponent implements OnInit {

  @ViewChild('tagList') tagList: MatChipList;
  tags: ITag[] = [];

  constructor(
    private albuminService: AlbuminService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getTags();
  }

  getTags(): void {
    this.albuminService.getTags()
      .subscribe(allTags => {
        if (allTags && allTags.length > 0) {
          const untaggedTag: ITag = { name: UNTAGGED_NAME, uniqueId: 'untagged' };
          allTags.unshift(untaggedTag);
        }
        this.tags = allTags;
      });
  }

  onTagClick(tag: ITag, chip: MatChip): void {
    // tag.selected = !tag.selected;
    chip.toggleSelected();
    this.onChange();
  }

  onChange() {
    const selectedChip = <MatChip>this.tagList.selected;

    let showUntagged = false;
    const selectedTagNames: string[] = [];
    if (selectedChip) {
      const name = (<string>selectedChip.value).trim();

      if (name === UNTAGGED_NAME) {
        showUntagged = true;
      } else {
        selectedTagNames.push(name);
      }
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
    if (showUntagged) {
      params['untagged'] = true;
    }
    this.router.navigate(['/albums'], { queryParams: params });
  }
}
