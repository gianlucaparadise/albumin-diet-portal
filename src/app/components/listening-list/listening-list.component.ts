import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation/navigation.service';
import { UserAlbum } from 'albumin-diet-types';
import { AppState } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { ListeningListLoad, ListeningListLoadNext } from 'src/app/store/actions/listening-list.action';
import { selectors } from 'src/app/store/selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listening-list',
  templateUrl: './listening-list.component.html',
  styleUrls: ['./listening-list.component.scss']
})
export class ListeningListComponent implements OnInit {

  albumDescriptors$: Observable<UserAlbum[]> = this.store.select(selectors.listeningListAlbumDescriptors);

  scrollContainerSelector = '.mat-sidenav-content';

  constructor(
    private navigation: NavigationService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.navigation.setTitle('My Listening List');
    this.getListeningList();
  }

  getListeningList() {
    this.store.dispatch(new ListeningListLoad());
  }

  /**
   * Here I append the next page
   */
  async onPageFinishing() {
    console.log('onPageFinishing');
    this.store.dispatch(new ListeningListLoadNext());
  }
}
