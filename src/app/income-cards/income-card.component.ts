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

  // marriedTaxableIncome: { children: number, false: number, true: number }[] = [

  // ]


  brackets: { id: number, taxRate: number, decrease: number, calculated: number }[] = [
    { id: 12500, taxRate: 0, decrease: 0, calculated: 0},
    { id: 14585, taxRate: 19, decrease: 0 , calculated: 0},
    { id: 25158, taxRate: 20, decrease: 0, calculated: 0},
    { id: 43439, taxRate: 21, decrease: 0 , calculated: 0},
    { id: 150000, taxRate: 41, decrease: 0 , calculated: 0},

];

get familyExemptionAmount() {
  if(this.marital == "S")
    return 0
  else
    return 907
}

get totalIncome() {
  return this.income *1000 + this.incomeDetails
}

get calcIncome() {
  return Math.max((this.totalIncome)  )//- this.familyExemptionAmount, 0)
}

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
