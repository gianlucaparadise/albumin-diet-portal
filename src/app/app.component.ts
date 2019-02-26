import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      `eggs_filled`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/eggs_filled.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `eggs_outlined`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/eggs_outlined.svg')
    );
  }

  title = 'albumin-diet-portal';
}
