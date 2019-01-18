import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// todo: refactor code to use an separated module that imports all the material modules
import {
  MatChipsModule, MatSidenavModule, MatCardModule, MatIconModule, MatButtonModule,
  MatFormFieldModule, MatToolbarModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TagListComponent } from './tag-list/tag-list.component';
import { AlbumListComponent } from './album-list/album-list.component';
import { LoginComponent } from './login/login.component';
import { AlbumDetailComponent } from './album-detail/album-detail.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './guards/auth.guard';
import { AnonymousGuard } from './guards/anonymous.guard';

@NgModule({
  declarations: [
    AppComponent,
    TagListComponent,
    AlbumListComponent,
    LoginComponent,
    AlbumDetailComponent,
    ToolbarComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatChipsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatToolbarModule,
    AppRoutingModule
  ],
  providers: [AuthGuard, AnonymousGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
