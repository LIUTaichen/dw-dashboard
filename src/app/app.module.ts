import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Adal5Service, Adal5HTTPService } from 'adal-angular5';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
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
import { TaskListComponent } from './task-list/task-list.component';
import { TaskService } from './task.service';
import { ProjectService } from './project.service';
import { InstallationStatusMapComponent } from './installation-status-map/installation-status-map.component';
import { InstallationStatusListComponent } from './installation-status-list/installation-status-list.component';
import { TrackingService } from './tracking.service';
import { HistoryTravellerComponent } from './history-traveller/history-traveller.component';
import { HistoryControlFormComponent } from './history-control-form/history-control-form.component';


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
    TaskListComponent,
    InstallationStatusMapComponent,
    InstallationStatusListComponent,
    HistoryTravellerComponent,
    HistoryControlFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
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
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
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
    TaskService,
    ProjectService,
    TrackingService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
