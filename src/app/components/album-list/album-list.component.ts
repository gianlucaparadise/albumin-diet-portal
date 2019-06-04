import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { NavigationService } from '../../services/navigation/navigation.service';
import { TaggedAlbum } from 'albumin-diet-types';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { selectors } from 'src/app/store/selectors';
import { MyAlbumsLoad, MyAlbumsLoadNext } from 'src/app/store/actions/my-albums.action';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss']
})
export class AlbumListComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  tags: string[] = [];
  showUntagged = false;
  albumDescriptors$: Observable<TaggedAlbum[]> = this.store.select(selectors.myAlbumDescriptors);

  scrollContainerSelector = '.mat-sidenav-content';

  constructor(
    private navigation: NavigationService,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.navigation.setTitle('My Albums');
    this.subscriptions.add(this.route
      .queryParams
      .subscribe(params => {
        this.tags = params['tags'];
        this.showUntagged = params['untagged'] === 'true';
        this.getAlbums(this.tags, this.showUntagged);
      }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getAlbums(tags: string[], showUntagged: boolean) {
    this.store.dispatch(new MyAlbumsLoad({ tags, showUntagged }));
  }

  /**
   * Here I append the next page
   */
  onPageFinishing() {
    console.log('onPageFinishing');
    this.store.dispatch(new MyAlbumsLoadNext());
  }
}
