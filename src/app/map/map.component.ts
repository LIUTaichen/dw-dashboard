import { Component, OnInit, NgZone } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { latLng, LatLng, tileLayer, Layer, polygon, marker, icon, Map } from 'leaflet';
import { GeofenceService } from '../geofence.service';
import { PlantService } from '../plant.service';
import { Geofence } from '../geofence';
import booleanPointInPolygon  from '@turf/boolean-point-in-polygon';
import { Coord, Feature, Polygon, MultiPolygon, Properties, polygon as turfPolygon } from '@turf/helpers';
import { Plant } from '../plant';
import  flip  from '@turf/flip';




@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})


export class MapComponent implements OnInit {

  geofences: Geofence[];
  layers: Layer[];
  plants: Plant[] = new Array<Plant>();
  plantsToList : Plant[];
  inProgress: boolean = true;

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
  private plantService: PlantService,
  private zone: NgZone) { }
  

  ngOnInit() {
    this.layers = new Array<Layer>();
    this.getGeofences();
    this.getPlants();
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
            let newList = new Array<Plant>();
              this.plants.forEach(element => {
                console.log(element);
                let point: Coord = element.latlng;
                if(booleanPointInPolygon(point,flip(mapFeature.toGeoJSON()))){
                  newList.push(element);
                }
              });
              this.zone.run(() => {
                this.plantsToList = newList;
              });
              
            });
            this.layers.push(mapFeature);
        })
        
      });
  }

  getPlants(): void {
      this.plantService.getPlants()
      .subscribe(returnedPlants => {
        this.plants = returnedPlants;
        returnedPlants.forEach(plant => {
          let mapFeature = marker(plant.latlng, {
            title: plant.fleetNo,
            icon: icon({
              iconSize: [ 25, 41 ],
              iconAnchor: [ 13, 41 ],
              iconUrl: 'leaflet/marker-icon.png',
              shadowUrl: 'leaflet/marker-shadow.png'
            })
          }).bindPopup(plant.fleetNo);
         
          this.layers.push(mapFeature);
          
        })
        this.zone.run(() => {
          this.inProgress = false;
        });
        
      })
  }

  onMapReady(map: Map) {
    console.log("map ready");
    map.on('moveend', e => {
      let newList = new Array<Plant>();
      this.plants.forEach(element => {
        if(map.getBounds().contains(element.latlng)){
          newList.push(element);
        }
      });
      this.zone.run(() => {
        this.plantsToList = newList;
      });
      

   });
  }

}
