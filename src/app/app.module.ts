import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// todo: refactor code to use an separated module that imports all the material modules
import {
  MatChipsModule, MatSidenavModule, MatCardModule, MatIconModule, MatButtonModule,
  MatFormFieldModule, MatToolbarModule, MatInputModule, MatTooltipModule
} from '@angular/material';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TagListComponent } from './components/tag-list/tag-list.component';
import { AlbumListComponent } from './components/album-list/album-list.component';
import { LoginComponent } from './components/login/login.component';
import { AlbumDetailComponent } from './components/album-detail/album-detail.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthGuard } from './guards/auth.guard';
import { AnonymousGuard } from './guards/anonymous.guard';
import { SearchComponent } from './components/search/search.component';
import { AlbumCardComponent } from './components/album-card/album-card.component';
import { ListeningListComponent } from './components/listening-list/listening-list.component';
import { TokenInterceptor } from './http-interceptors/token.interceptor';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TracksDurationPipe } from './pipes/tracksDuration/tracksDuration.pipe';
import { DurationPipe } from './pipes/duration/duration.pipe';
import { ToggleIconButtonComponent } from './components/toggle-icon-button/toggle-icon-button.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './store/effetcs';

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
    ListeningListComponent,
    SidebarComponent,
    TracksDurationPipe,
    DurationPipe,
    ToggleIconButtonComponent,
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
    MatTooltipModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects)
  ],
  providers: [
    AuthGuard,
    AnonymousGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
