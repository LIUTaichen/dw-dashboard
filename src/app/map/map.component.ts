import { Component, OnInit } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { latLng, LatLng, tileLayer, Layer, polygon } from 'leaflet';
import { GeofenceService } from '../geofence.service';
import { Geofence } from '../geofence';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})


export class MapComponent implements OnInit {

  geofences: Geofence[];
  layers: Layer[];

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

  constructor(private geofenceService: GeofenceService) { }

  ngOnInit() {
    this.layers = new Array<Layer>();
    this.getGeofences();
    this.geofenceService.testApi();
  }

  getGeofences(): void {
    this.geofenceService.getGeofences()
      .subscribe(returnedGeofences => {
        this.geofences = returnedGeofences;
        console.log(this.geofences);
        console.log(this.layers);
        this.geofences.forEach(fence =>{
            let mapFeature =  polygon(fence.latlngs, {
              color: 'red',
              fillColor: '#f03',
              fillOpacity: 0.5,
            });
            mapFeature.bindPopup(fence.description);
            mapFeature.name = fence.name;
            this.layers.push(mapFeature);
        })
        
      });
  }

}
