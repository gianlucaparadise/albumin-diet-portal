import { Component, OnInit, ViewChild, ViewEncapsulation, /*ChangeDetectionStrategy*/ } from '@angular/core';
import { Router } from '@angular/router';

import { MatChip, MatChipList } from '@angular/material';
import { ITag, TagDescriptor } from 'albumin-diet-types';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { TagsLoad } from 'src/app/store/actions/tag.actions';
import { selectors } from 'src/app/store/selectors';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TagListComponent implements OnInit {

  @ViewChild('tagList') tagList: MatChipList;
  tags$: Observable<TagDescriptor[]> = this.store.select(selectors.tags);
  UNTAGGED_NAME = 'Untagged'; // this is a const

  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) { }

  ngOnInit() {
    this.store.dispatch(new TagsLoad());
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

      if (name === this.UNTAGGED_NAME) {
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
