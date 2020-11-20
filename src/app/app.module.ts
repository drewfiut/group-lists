import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { NavComponent } from './components/nav/nav.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { GroupsComponent } from './components/groups/groups.component';
import { GroupComponent } from './components/group/group.component';
import { GroupsRouterComponent } from './components/groups-router/groups-router.component';
import { ListComponent } from './components/list/list.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { CurrentIDPipe } from './pipes/current-id.pipe';
import { MyListComponent } from './components/my-list/my-list.component';
import { MyListItemComponent } from './components/my-list-item/my-list-item.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { JoinGroupComponent } from './components/join-group/join-group.component';
import { CreateGroupComponent } from './components/create-group/create-group.component';
import { LoadingComponent } from './components/loading/loading.component';
import { DisclosuresComponent } from './components/disclosures/disclosures.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    GroupsComponent,
    GroupComponent,
    GroupsRouterComponent,
    ListComponent,
    ListItemComponent,
    CurrentIDPipe,
    MyListComponent,
    MyListItemComponent,
    AddItemComponent,
    JoinGroupComponent,
    CreateGroupComponent,
    LoadingComponent,
    DisclosuresComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
