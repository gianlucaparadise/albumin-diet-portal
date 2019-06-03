import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, NavigationStart, NavigationEnd, Event } from '@angular/router';
import { filter, scan, observeOn } from 'rxjs/operators';
import { asyncScheduler } from 'rxjs';

interface ScrollPositionRestore {
  event: Event;
  positions: { [K: number]: number };
  trigger: 'imperative' | 'popstate' | 'hashchange';
  idToRestore: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('contentArea', { read: ElementRef }) private contentArea: ElementRef<HTMLMainElement>;

  title = 'albumin-diet-portal';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private router: Router
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

  ngOnInit() {
    //#region Scroll position restoration
    // Source: https://blog.angularindepth.com/reactive-scroll-position-restoration-with-rxjs-792577f842c
    // FIXME: this is not working correctly.
    this.router.events
      .pipe(
        filter(
          event =>
            event instanceof NavigationStart || event instanceof NavigationEnd,
        ),
        scan<Event, ScrollPositionRestore>((acc, event) => ({
          event,
          positions: {
            ...acc.positions,
            ...(event instanceof NavigationStart
              ? {
                  [event.id]: this.contentArea.nativeElement.scrollTop,
                }
              : {}),
          },
          trigger:
            event instanceof NavigationStart
              ? event.navigationTrigger
              : acc.trigger,
          idToRestore:
            (event instanceof NavigationStart &&
              event.restoredState &&
              event.restoredState.navigationId + 1) ||
            acc.idToRestore,
        })),
        filter(
          ({ event, trigger }) => event instanceof NavigationEnd && !!trigger,
        ),
        observeOn(asyncScheduler),
      )
      .subscribe(({ trigger, positions, idToRestore }) => {
        if (trigger === 'imperative') {
          this.contentArea.nativeElement.scrollTop = 0;
        } else if (trigger === 'popstate') {
          this.contentArea.nativeElement.scrollTop = positions[idToRestore];
        } else {
          console.log(`trigger not handled: ${trigger}`);
        }
      });
    //#endregion
  }
}
