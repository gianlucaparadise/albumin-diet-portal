import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbuminService } from '../albumin.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss']
})
export class AlbumListComponent implements OnInit, OnDestroy {

  albums = [];
  queryParamsSub: Subscription;

  constructor(
    private albuminService: AlbuminService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.queryParamsSub = this.route
      .queryParams
      .subscribe(params => {
        const tags = params['tags'];
        this.getAlbums(tags);
      });
  }

  ngOnDestroy() {
    this.queryParamsSub.unsubscribe();
  }

  getAlbums(tags: any) {
    this.albuminService.getAlbums(tags)
      .subscribe(response => {
        this.albums = response.data;
      });
  }
}
