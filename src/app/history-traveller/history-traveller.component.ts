import { Component, OnInit, NgZone } from '@angular/core';
import { PlantService } from '../plant.service';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { latLng, LatLng, tileLayer, Layer, polygon, marker, icon, Map } from 'leaflet';
import { GeofenceService } from '../geofence.service';
import { Geofence } from '../geofence';

@Component({
  selector: 'app-history-traveller',
  templateUrl: './history-traveller.component.html',
  styleUrls: ['./history-traveller.component.css']
})
export class HistoryTravellerComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {
    console.log('onInit');
    this.inProgress = false;
  }

  onMapReady(map: Map) {
    console.log("map ready");
    this.map = map;
   
    //this.decrementCountdown();
  }

}
