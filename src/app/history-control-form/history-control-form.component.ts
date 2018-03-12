import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import { PlantService } from '../plant.service';
import { Plant } from '../plant';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

@Component({
  selector: 'app-history-control-form',
  templateUrl: './history-control-form.component.html',
  styleUrls: ['./history-control-form.component.css']
})
export class HistoryControlFormComponent implements OnInit {
  vehicleId: number;
  date: Date;
  rego: string;
  hours: string = '';
  minutes: string = '';
  control: FormControl = new FormControl();
  options: Plant[] = new Array<Plant>();
  filteredOptions: Observable<Plant[]>;
  constructor(private plantService: PlantService,) { }

  ngOnInit() {
    this.getVehicles();
    this.filteredOptions = this.control.valueChanges
    .pipe(
      startWith(''),
      map(val => this.filter(val))
    );
  }

  onGo(): void {
    console.log('onGo!');
    //TODO: watch out for null pointer
    console.log(this.control.value.id);
    console.log(this.date);
    console.log(this.hours);
    console.log(this.minutes);

  }

  onClear(): void {
    console.log('clear!');
    this.control.reset();
    this.date = null;
    this.hours = '';
    this.minutes = '';
  }

  getVehicles(){
    this.plantService.getPlants()
      .subscribe(vehicles =>{
        this.options = vehicles;
      })
  }

  filter(val: string): Plant[] {
    console.log(val);
    let feed: string;
    if(val === null){
      feed = '';
    }else{
      feed=val.toString().toLocaleLowerCase();
    }
    return this.options.filter(option =>
      option.fleetNo.toLowerCase().indexOf(feed) === 0)
    ;
  }

  displayVehicle(plant ?: Plant): string | undefined {
    return plant ? plant.fleetNo : undefined;
  }
}
