import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumListComponent } from './album-list/album-list.component';
import { AlbumDetailComponent } from './album-detail/album-detail.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AnonymousGuard } from './guards/anonymous.guard';
import { AuthGuard } from './guards/auth.guard';
import { SearchComponent } from './search/search.component';
import { ListeningListComponent } from './listening-list/listening-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/albums', pathMatch: 'full' },
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
