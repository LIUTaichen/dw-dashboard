import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';

@Directive({
  selector: '[appPlantNumberValidator]'
})
export class PlantNumberValidatorDirective implements Validator{


  validate(control: AbstractControl): {[key: string]: any} {
    if(control.value ){
      console.log("has value");
    }
    return null;
  }

}
