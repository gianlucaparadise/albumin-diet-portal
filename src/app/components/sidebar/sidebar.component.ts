import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  title = 'Albumin diet';

  constructor(private router: Router, public auth: AuthService) { }

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
