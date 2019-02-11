import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  title = 'Albumin diet';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToSearch() {
    this.router.navigate(['/search']);
  }

  goToAlbum() {
    this.router.navigate(['/albums']);
  }

  goToListeningList() {
    this.router.navigate(['/listening-list']);
  }

}
