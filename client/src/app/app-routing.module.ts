import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserEditComponent } from './components/user-edit.component';
import { ArtistListComponent } from './components/artist-list.component';
import { HomeComponent } from './components/home.component';
import { ArtistAddComponent } from './components/artist-add.component';
import { ArtistEditComponent } from './components/artist-edit.component';
import { ArtistDetailComponent } from './components/artist-detail.component';
import { AlbumAddComponent } from './components/album-add.component';
import { AlbumEditComponent } from './components/album-edit.component';
import { AlbumDetailComponent } from './components/album-detail.component';
import { SongAddComponent } from './components/song.add.component';


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
    path: 'editar-artista/:id',
    component: ArtistEditComponent
  },
  {
    path: 'artista/:id',
    component: ArtistDetailComponent
  },
  {
    path: 'crear-album/:artista',
    component: AlbumAddComponent
  },
  {
    path: 'editar-album/:id',
    component: AlbumEditComponent
  },
  {
    path: 'album/:id',
    component: AlbumDetailComponent
  },
  {
    path: 'crear-cancion/:id',
    component: SongAddComponent 
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
