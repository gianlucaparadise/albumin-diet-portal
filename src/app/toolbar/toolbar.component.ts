import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  title = 'Albumin diet';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToSearch() {

  }

  goToAlbum() {
    this.router.navigate(['/albums']);
  }

}
