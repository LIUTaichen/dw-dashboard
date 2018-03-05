import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Adal5Service, Adal5HTTPService } from 'adal-angular5';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule} from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { AppCardComponent } from './app-card/app-card.component';
import { AppsComponent } from './apps/apps.component';
import { AppService } from './app.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { AppRoutingModule } from './/app-routing.module';
import { AppSearchComponent } from './app-search/app-search.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapComponent } from './map/map.component';
import { GeofenceService } from './geofence.service';
import { MapListComponent } from './map-list/map-list.component';
import { PlantService } from './plant.service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TopMenuComponent,
    AppCardComponent,
    AppsComponent,
    MessagesComponent,
    AppSearchComponent,
    MapComponent,
    MapListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatToolbarModule,
    MatGridListModule,
    MatListModule,
    MatCardModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false,  delay: 20, passThruUnknownUrl: true  }
    ),
    LeafletModule.forRoot(),
  ],
  providers: [
    AppService,
    MessageService,
    Adal5Service,
    { provide: Adal5HTTPService, useFactory: Adal5HTTPService.factory, deps: [HttpClient, Adal5Service] },
    GeofenceService,
    PlantService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
