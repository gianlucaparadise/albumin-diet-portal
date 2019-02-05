import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlbuminService } from '../albumin.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  searchFieldValue = '';
  searchFieldControl = new FormControl();
  searchFieldControlSubscription: Subscription;

  scrollContainerSelector = '.mat-sidenav-content';

  albums: any[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private albuminService: AlbuminService
  ) { }

  ngOnInit() {
    // debounce keystroke events
    this.searchFieldControlSubscription = this.searchFieldControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(newValue => {
      this.searchFieldValue = newValue;
      this.updateQueryParam();
      console.log(this.searchFieldValue);

      this.search();
    });

    this.route.queryParams.subscribe(queryParams => {
      const q = queryParams['q'];
      const keywords = q === undefined ? '' : q;
      this.searchFieldControl.setValue(keywords);

      console.log(`q: ${queryParams['q']}`);
    });
  }

  ngOnDestroy() {
    this.searchFieldControlSubscription.unsubscribe();
  }

  clear() {
    this.searchFieldControl.setValue('');
  }

  updateQueryParam() {
    const keywords = this.searchFieldValue === '' ? null : this.searchFieldValue;

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: { q: keywords },
        queryParamsHandling: 'merge'
      });
  }

  async search() {
    if (this.searchFieldValue.trim() === '') {
      // todo: clear results
      return;
    }

    this.searchAlbums();
  }

  async searchAlbums() {
    try {
      const response = await this.albuminService.searchAlbums(this.searchFieldValue);
      this.albums = response.data;
      console.log('albums:');
      console.log(this.albums);

    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Here I append the next page
   */
  async onPageFinishing() {
    try {
      const offset = this.albums.length;
      const response = await this.albuminService.searchAlbums(this.searchFieldValue, offset);
      this.albums.push(...response.data);

      console.log('added albums: ');
      console.log(response.data);

    } catch (error) {
      console.log('error while loading next page: ');
      console.log(error);
    }
  }
}
