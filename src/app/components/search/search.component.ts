import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NavigationService } from '../../services/navigation/navigation.service';
import { UserAlbum } from 'albumin-diet-types';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { selectors } from 'src/app/store/selectors';
import { SearchLoad } from 'src/app/store/actions/search.action';

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

  albumDescriptors$: Observable<UserAlbum[]> = this.store.select(selectors.search);

  constructor(
    private store: Store<AppState>,
    private navigation: NavigationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.navigation.setTitle('Search');
    // debounce keystroke events
    this.searchFieldControlSubscription = this.searchFieldControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(newValue => {
      this.searchFieldValue = newValue;
      this.updateQueryParam();

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

  searchAlbums() {
    this.store.dispatch(new SearchLoad({ keywords: this.searchFieldValue }));
  }

  /**
   * Here I append the next page
   */
  async onPageFinishing() {
    console.log('onPageFinishing');
    // try {
    //   const offset = this.albums.length;
    //   const response = await this.albuminService.searchAlbums(this.searchFieldValue, offset);
    //   this.albums.push(...response.data);

    //   console.log('added albums: ');
    //   console.log(response.data);

    // } catch (error) {
    //   console.log('error while loading next page: ');
    //   console.log(error);
    // }
  }
}
