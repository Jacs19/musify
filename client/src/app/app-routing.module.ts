import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserEditComponent } from './components/user-edit.component';
import { ArtistListComponent } from './components/artist-list.component';
import { HomeComponent } from './components/home.component';
import { ArtistAddComponent } from './components/artist-add.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'artistas/:page',
    component: ArtistListComponent
  },
  {
    path: 'crear-artista',
    component: ArtistAddComponent
  },
  {
      path: 'mis-datos',
      component: UserEditComponent
  },
  {
      path: '**',
      component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
