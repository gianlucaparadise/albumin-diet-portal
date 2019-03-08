import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumListComponent } from './components/album-list/album-list.component';
import { AlbumDetailComponent } from './components/album-detail/album-detail.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AnonymousGuard } from './guards/anonymous.guard';
import { AuthGuard } from './guards/auth.guard';
import { SearchComponent } from './components/search/search.component';
import { ListeningListComponent } from './components/listening-list/listening-list.component';
import { RootGuard } from './guards/root.guard';

const routes: Routes = [
  // I use WelcomeComponent as a dummy component because the RootGuard will always redirect
  { path: '', component: WelcomeComponent, canActivate: [RootGuard] },
  { path: 'welcome', component: WelcomeComponent, canActivate: [AnonymousGuard] },
  { path: 'albums', component: AlbumListComponent, canActivate: [AuthGuard] },
  { path: 'album/:albumId', component: AlbumDetailComponent, canActivate: [AuthGuard] },
  { path: 'listening-list', component: ListeningListComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
