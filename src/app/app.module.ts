import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule, MatSidenavModule, MatCardModule, MatIconModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TagListComponent } from './tag-list/tag-list.component';
import { AlbumListComponent } from './album-list/album-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TagListComponent,
    AlbumListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatChipsModule,
    MatCardModule,
    MatIconModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
