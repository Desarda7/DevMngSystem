import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { DevProfileComponent } from './dev-profile/dev-profile.component';
import { ManageDevsComponent } from './manage-devs/manage-devs.component';

const routes: Routes = [
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'add-developer', component: DevProfileComponent },
  { path: 'manage-devs', component: ManageDevsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
