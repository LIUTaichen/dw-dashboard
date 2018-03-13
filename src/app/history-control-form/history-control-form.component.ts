import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import { PlantService } from '../plant.service';
import { TrackingService } from '../tracking.service';
import { Plant } from '../plant';
import { startWith} from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { MatSnackBar} from '@angular/material';

const localstorageKey : string = 'historyFormControlValues';

@Component({
  selector: 'app-history-control-form',
  templateUrl: './history-control-form.component.html',
  styleUrls: ['./history-control-form.component.css']
})


export class HistoryControlFormComponent implements OnInit {
  
  vehicleId: number;
  date: Date;
  hours: number;
  minutes: number;
  control: FormControl = new FormControl();
  options: Plant[] = new Array<Plant>();
  filteredOptions: Observable<Plant[]>;
  regoFieldReady: boolean = false;
  result: any;
  showProgress: boolean = false;
  @Output() onGoClick = new EventEmitter<any>();

  constructor(
    private plantService: PlantService,
    private trackingService: TrackingService,
    private snackBar: MatSnackBar,) { }

  ngOnInit() {
    let storedValues : string = localStorage.getItem(localstorageKey);
    if(storedValues){
      let values = JSON.parse(storedValues);
      this.date = new Date(values.date);
      this.hours = values.hours;
      this.minutes = values.minutes;
      this.control.setValue(values.controlValue);
    }
    this.getVehicles();
    this.filteredOptions = this.control.valueChanges
    .pipe(
      startWith(''),
      map(val => this.filter(val))
    );
    
  }

  onGo(): void {
    this.showProgress = true;
    this.result = null;
    console.log('onGo!');
    //TODO: watch out for null pointer
    if(this.control.value !== null){
      console.log(this.control.value.id);
    }else{
      console.log('rego is null');
    }
    
    this.date.setHours(this.hours);
    this.date.setMinutes(this.minutes);


    this.trackingService.getPosition(this.control.value.id, this.date )
      .subscribe(result =>{
        if(!result){
          this.snackBar.open("Can't find any data from the server.", '', {
            duration: 2000,
          });
          this.showProgress = false;
        }else{
        this.result = result;
        this.onGoClick.emit(result);
        this.showProgress = false;
        }
      });

      localStorage.setItem(localstorageKey, JSON.stringify({
        date : this.date,
        controlValue : this.control.value,
        hours: this.hours,
        minutes: this.minutes
      }));
    
    
  }

  onClear(): void {
    console.log('clear!');
    this.control.reset();
    this.date = null;
    this.hours = null;
    this.minutes = null;
    this.result = null;
  }

  getVehicles(){
    this.plantService.getPlants()
      .subscribe(vehicles =>{
        this.options = vehicles;
        this.snackBar.open('Vehicle list ready', '', {
          duration: 2000,
        });
        this.regoFieldReady = true;
        this.showProgress = false;
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

  processKeyUp(event, element){
    console.log(event);
    console.log(this.hours);
    if(this.hours.toString().length === 2){
      element.focus();
    }
  }
}
