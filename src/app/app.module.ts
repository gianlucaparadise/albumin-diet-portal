import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// todo: refactor code to use an separated module that imports all the material modules
import {
  MatChipsModule, MatSidenavModule, MatCardModule, MatIconModule, MatButtonModule,
  MatFormFieldModule, MatToolbarModule, MatInputModule
} from '@angular/material';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

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
import { SearchComponent } from './search/search.component';
import { AlbumCardComponent } from './album-card/album-card.component';
import { ListeningListComponent } from './listening-list/listening-list.component';
import { TokenInterceptor } from './http-interceptors/token.interceptor';
import { UrlInterceptor } from './http-interceptors/url.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    TagListComponent,
    AlbumListComponent,
    LoginComponent,
    AlbumDetailComponent,
    ToolbarComponent,
    WelcomeComponent,
    SearchComponent,
    AlbumCardComponent,
    ListeningListComponent
  ],
  imports: [
    BrowserModule,
    InfiniteScrollModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatChipsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatInputModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    AnonymousGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UrlInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
