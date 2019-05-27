import { Component, OnInit, ViewChild, /*ChangeDetectionStrategy*/ } from '@angular/core';
import { Router } from '@angular/router';

import { MatChip, MatChipList } from '@angular/material';
import { ITag } from 'albumin-diet-types';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { TagsLoad } from 'src/app/store/actions/tag.actions';
import { selectors } from 'src/app/store/selectors';

const UNTAGGED_NAME = 'Untagged';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagListComponent implements OnInit {

  @ViewChild('tagList') tagList: MatChipList;
  tags$: Observable<ITag[]> = this.store.select(selectors.tags);

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
