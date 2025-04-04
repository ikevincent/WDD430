import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BirdListComponent } from './bird-list.component';
import { BirdDetailComponent } from './bird-detail.component';
import { BirdEditComponent } from './bird-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/birds', pathMatch: 'full' },
  { path: 'birds', component: BirdListComponent },
  { path: 'bird-details/:id', component: BirdDetailComponent },
  { path: 'edit-bird/:id', component: BirdEditComponent }, // Ensure this is a direct route
  { path: 'add-bird', component: BirdEditComponent }, // Ensure add bird is also direct
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
