import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserEditComponent } from './components/user-edit.component';
import { ArtistListComponent } from './components/artist-list.component';


const routes: Routes = [
  {
    path: '',
    component: ArtistListComponent
  },
  {
    path: 'artists/:page',
    component: ArtistListComponent
  },
  {
      path: 'mis-datos',
      component: UserEditComponent
  },
  {
      path: '**',
      component: ArtistListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
