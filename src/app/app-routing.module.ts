import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppsComponent } from './apps/apps.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppCardComponent } from './app-card/app-card.component';
import { MapComponent } from './map/map.component';
import { TaskListComponent } from './task-list/task-list.component';
import { InstallationStatusMapComponent } from './installation-status-map/installation-status-map.component';
import { HistoryTravellerComponent } from './history-traveller/history-traveller.component';
import { AuthGuardService } from './auth-guard/auth-guard.service';


const routes: Routes = [
  { path: 'apps', component: AppsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/maps', pathMatch: 'full' },
  { path: 'app/:id', component: AppCardComponent},
  // { path: 'maps', component: MapComponent, canActivate: [AuthGuardService]},
  { path: 'maps', component: MapComponent},
  { path: 'tasks', component: TaskListComponent},
  { path: 'maps/installation', component: InstallationStatusMapComponent},
  { path: 'maps/history', component: HistoryTravellerComponent},
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule {
}
