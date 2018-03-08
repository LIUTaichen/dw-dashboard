import { Component, OnInit, NgZone } from '@angular/core';
import { PlantService } from '../plant.service';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { latLng, LatLng, tileLayer, Layer, polygon, marker, icon, Map } from 'leaflet';
import { GeofenceService } from '../geofence.service';
import { Geofence } from '../geofence';

let countdownLatch = 4;

@Component({
  selector: 'app-installation-status-map',
  templateUrl: './installation-status-map.component.html',
  styleUrls: ['./installation-status-map.component.css']
})
export class InstallationStatusMapComponent implements OnInit {

  geofences: Geofence[];
  layers: Layer[] = new Array<Layer>();
  plants: any[] = new Array<any>();
  plantsToList : any[];
  inProgress: boolean = true;
  projects: any[];
  project: any;
  map: Map;
  

  options = {
    layers: [
      tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiamFzb25saXV0YWljaGVuIiwiYSI6ImNqNmZ5ZGpkcjAzYWIzNXA1aWs5OXF3bXcifQ.33nis-JWUXYo1jpJkr1OSQ'
      })
    ],
    zoom: 12,
    center: latLng(-36.914827, 174.8072903)
  };

  constructor(private geofenceService: GeofenceService,
    private zone: NgZone,
    private plantsService: PlantService) { }

  ngOnInit() {
    this.getPlants();
    this.getGeofences();
    this.getProjects();

  }

  onMapReady(map: Map) {
    console.log("map ready");
    this.map = map;
    this.decrementCountdown();
  }

  getGeofences(): void {
    this.geofenceService.getGeofences()
      .subscribe(returnedGeofences => {
        this.geofences = returnedGeofences;
        this.geofences.forEach(fence =>{
            let mapFeature =  polygon(fence.latlngs, {
              color: 'red',
              fillColor: '#f03',
              fillOpacity: 0.5,
            });
            mapFeature.bindPopup(fence.description);
            mapFeature.name = fence.name;
            mapFeature.on('click', e =>{
              let jobNo = e.target.name;
              console.log(e.target);
            let newList = new Array<any>();
              this.plants.forEach(element => {
                //console.log(element);
                if(element['Department'] === jobNo){
                  newList.push(element);
                }
              });
              this.zone.run(() => {
                console.log('displaying ' + newList.length + ' plants');
                this.plantsToList = newList;
              });
              
            });
            this.layers.push(mapFeature);
        })
        this.decrementCountdown();
      });
  }

getPlants(): void{
  this.plantsService.getGoogleSheetPlantList().
    subscribe(rows => {
      this.plants = rows;
      this.decrementCountdown();
    }
  );
}

getProjects(): void{
  this.plantsService.getProjectList().
  subscribe(rows => {
      this.projects = rows;

      this.decrementCountdown();
  }
);
}

decrementCountdown(){
  countdownLatch--;
  if(countdownLatch === 0){
    console.log('all data fetched');
    console.log(this.map);
  }
}

}
