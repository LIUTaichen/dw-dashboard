import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppsComponent } from './apps/apps.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppCardComponent } from './app-card/app-card.component';
import { MapComponent } from './map/map.component';



const routes: Routes = [
  { path: 'apps', component: AppsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/map', pathMatch: 'full' },
  { path: 'app/:id', component: AppCardComponent},
  { path: 'map', component: MapComponent},
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
