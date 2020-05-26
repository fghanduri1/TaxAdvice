//this class is used to process the front end of the tax calculator 
//the respective html and css classes are added as components here too

import { Component,ViewChild,ElementRef } from '@angular/core';
import { ChangeDetectorRef, AfterViewChecked } from "@angular/core";
import {fromEvent} from "rxjs"
import {map, throttleTime} from "rxjs/operators"
@Component({
  selector: 'income-card',
  templateUrl: 'income-card.component.html',
  styleUrls: [ 'income-card.component.css' ]
})
export class IncomeCard  {
//setting the initial values of each inputted section
  @ViewChild('btnIncrease')
  btnIncrease : ElementRef;

  marital: string = "S"
  wifeWorkStatus: boolean = false;
  children: number = 0;
  income: number = 0;
  incomeDetails: number = 0;
  _incomeIndex: number = 0;
  _propCalcIncome: number = 0;
  currency: boolean = false

  applyDecrease: boolean = false;
  recursiveDecrease: boolean = false;

constructor(private cdRef:ChangeDetectorRef){

}

//tax brackets are assigned with an id value that will be displayed and a tax rate percentage 
//that will be used to multiply the income with 
  brackets: { id: number, taxRate: number, decrease: number, calculated: number }[] = [
    { id: 12500, taxRate: 0, decrease: 0, calculated: 0},
    { id: 14585, taxRate: 19, decrease: 0 , calculated: 0},
    { id: 25158, taxRate: 20, decrease: 0, calculated: 0},
    { id: 43439, taxRate: 21, decrease: 0 , calculated: 0},
    { id: 150000, taxRate: 41, decrease: 0 , calculated: 0},

];
//the martial status is retrieved and if single no exemptions will be added but if the user click m then an exemption is returned
get familyExemptionAmount() {
  if(this.marital == "S")
    return 0
  else
    return 907
}

//since using the slider, the income inputted needs to multiplied 
get totalIncome() {
  return this.income *1000 + this.incomeDetails
}

//the total income is calculated 
get calcIncome() {
  return Math.max((this.totalIncome)  )//- this.familyExemptionAmount, 0)
}

//direct income tax is calculated using the brackets specified 
//the income is devided into increments meaning that when each bracket
//is reached its maximum value, the next bracket would be taken into account 
//from each of these bracket divisions the total is calculated 
get incomeIndex() {
  var prevEntry: any = this.brackets[0];
  var i: number = 1;
  this._propCalcIncome = 0
  for (let entry of this.brackets) {
    entry.calculated = 0
    if(this.calcIncome <= (entry.id)) {
      entry.calculated = Math.max((this.calcIncome - (i == 1? 0 : prevEntry.id)) * (entry.taxRate / 100) - (this.recursiveDecrease ? entry.decrease : 0), 0)
      this._propCalcIncome += entry.calculated;
      this._incomeIndex = i;
      break;
    } else {
      entry.calculated = Math.max((entry.id - (i == 1? 0 : prevEntry.id)) * (entry.taxRate / 100) - (this.recursiveDecrease ? entry.decrease : 0) , 0)
      this._propCalcIncome += entry.calculated;
    }
    prevEntry = entry;
    i++;
  }

  return this._incomeIndex;
}

get propCalcIncome() {
  return this._propCalcIncome / (this.currency ? 0.8 : 1);
}

get decrease() {
  return (this.applyDecrease? this.brackets[this.incomeIndex -1].decrease / (this.currency ? 0.8 : 1) : 0)
}

get taxRate() {
  return this.brackets[this.incomeIndex - 1].taxRate
}

get totalTaxAmount() {
  return this.propCalcIncome  //- this.decrease
}


updateIndex(income: any) {

}

//side label is created for visualisation and 
//when tax value increases the label would also to
formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 120) {
      return '+' + value;
    }

    return value + 'k';
  }

  formatDetails(value: number | null) {
    return (value / 1000) + 'k';
  }

  buttonShiftUp(value, step, max) {
    if (value >= max)
      return max;

    return value += step;
  }

  buttonShiftDown(value, step, min) {
    if (value <= min)
      return 0;

    return  value -= step;
  }

ngAfterViewChecked() {

    this.cdRef.detectChanges();
  }

  ngAfterViewInit() {

  }

}
