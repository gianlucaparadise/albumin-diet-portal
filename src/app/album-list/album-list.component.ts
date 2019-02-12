import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbuminService } from '../albumin.service';
import { Subscription } from 'rxjs';
import { NavigationService } from '../services/navigation/navigation.service';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss']
})
export class AlbumListComponent implements OnInit, OnDestroy {

  tags: string[] = [];
  albums = [];
  queryParamsSub: Subscription;

  scrollContainerSelector = '.mat-sidenav-content';

  constructor(
    private navigation: NavigationService,
    private albuminService: AlbuminService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.navigation.setTitle('My Albums');
    this.queryParamsSub = this.route
      .queryParams
      .subscribe(params => {
        this.tags = params['tags'];
        this.getAlbums(this.tags);
      });
  }

  ngOnDestroy() {
    this.queryParamsSub.unsubscribe();
  }

  async getAlbums(tags: any) {
    try {
      const response = await this.albuminService.getAlbums(tags);
      this.albums = response.data;

    } catch (error) {
      console.log('error while getting my albums:');
      console.log(error);
    }
  }

  /**
   * Here I append the next page
   */
  async onPageFinishing() {
    try {
      const offset = this.albums.length;
      const response = await this.albuminService.getAlbums(this.tags, offset);
      this.albums.push(...response.data);

    } catch (error) {
      console.log('error while loading next page: ');
      console.log(error);
    }
  }
}
