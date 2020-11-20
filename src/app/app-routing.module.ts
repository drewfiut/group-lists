import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisclosuresComponent } from './components/disclosures/disclosures.component';
import { GroupComponent } from './components/group/group.component';
import { GroupsRouterComponent } from './components/groups-router/groups-router.component';
import { GroupsComponent } from './components/groups/groups.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'groups',
    component: GroupsRouterComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: GroupsComponent },
      { path: ':id', component: GroupComponent },
    ],
  },
  { path: 'disclosures', component: DisclosuresComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
