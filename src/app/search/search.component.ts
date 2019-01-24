import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  searchFieldValue = '';
  searchFieldControl = new FormControl();
  searchFieldControlSubscription: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    // debounce keystroke events
    this.searchFieldControlSubscription = this.searchFieldControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(newValue => {
      this.searchFieldValue = newValue;
      this.updateQueryParam();
      console.log(this.searchFieldValue);
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

  getValues() {
  }
}
