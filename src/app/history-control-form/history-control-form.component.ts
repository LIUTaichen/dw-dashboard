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
  selectedPlant: Plant;
  date: Date;
  hours: number;
  minutes: number;
  plantControl: FormControl = new FormControl(this.selectedPlant);
  options: Plant[] = new Array<Plant>();
  filteredOptions: Observable<Plant[]>;
  regoFieldReady: boolean = false;
  result: any;
  showProgress: boolean = false;
  maxDate : Date = new Date();
  @Output() onGoClick = new EventEmitter<any>();
  @Output() onClearClick = new EventEmitter<any>();

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
      this.plantControl.setValue(values.controlValue);
    }
    this.getVehicles();
    this.filteredOptions = this.plantControl.valueChanges
    .pipe(
      startWith(''),
      map(val => this.filter(val))
    );
    
  }

  onGo(): void {
    if(!this.plantControl.value || !this.plantControl.value.id){
      this.snackBar.open("Please enter a valid rego.", '', {
        duration: 2000,
      });
      return;
    }
    this.showProgress = true;
    this.result = null;
    console.log('onGo!');
    //TODO: watch out for null pointer
    if(this.plantControl.value !== null){
      console.log(this.plantControl.value.id);
    }else{
      console.log('rego is null');
    }
    
    this.date.setHours(this.hours);
    this.date.setMinutes(this.minutes);
    

    this.trackingService.getPosition(this.plantControl.value.id, this.date )
      .subscribe(result =>{
        if(!result){
          this.snackBar.open("Can't find any data from the server.", '', {
            duration: 2000,
          });
          this.showProgress = false;
        }else{
        this.result = result;
        result.fleetNo = this.plantControl.value.fleetNo;
        result.timestamp = this.date;
        this.onGoClick.emit(result);
        this.showProgress = false;
        }
      });

      localStorage.setItem(localstorageKey, JSON.stringify({
        date : this.date,
        controlValue : this.plantControl.value,
        hours: this.hours,
        minutes: this.minutes
      }));
    
    
  }

  onClear(): void {
    console.log('clear!');
    this.plantControl.reset();
    this.date = null;
    this.hours = null;
    this.minutes = null;
    this.result = null;
    this.onClearClick.emit();
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

  processChange(hoursValue, element){
    console.log(hoursValue);
    if(hoursValue.length === 2){
    element.focus();
    }
  }
}
