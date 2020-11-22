import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { DisclosuresComponent } from './components/disclosures/disclosures.component';
import { ErrorComponent } from './components/error/error.component';
import { GroupComponent } from './components/group/group.component';
import { GroupsRouterComponent } from './components/groups-router/groups-router.component';
import { GroupsComponent } from './components/groups/groups.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
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
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
