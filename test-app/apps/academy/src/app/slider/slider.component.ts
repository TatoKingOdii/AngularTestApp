import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCard} from "@angular/material/card";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {filter, map, Observable, pairwise, startWith, Subscription, tap} from "rxjs";
import {SalesNumberService} from "./sales-service/sales-number.service";
import {SalesWidgetComponent} from "./sales-widget/sales-widget.component";


export interface Range {
  min: number,
  max: number
}

@Component({
  selector: 'test-app-slider',
  standalone: true,
  imports: [CommonModule, MatCard, ReactiveFormsModule, SalesWidgetComponent],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
})
export class SliderComponent implements OnInit, OnDestroy {
  daForm!: FormGroup;
  minValue$!: Observable<number>;
  maxValue$!: Observable<number>;
  min: number = 0;
  max: number = 100;
  startMin: number = 45;
  startMax: number = 60;
  step: number = 1;
  subscriptions = new Subscription();

  constructor(private fb: FormBuilder, private sales: SalesNumberService) {
  }

  ngOnInit() {
    this.daForm = this.fb.group({
      min: this.startMin,
      max: this.startMax
    });

    this.sales.updateRange({min: this.startMin, max: this.startMax});

    const valueStream$: Observable<Range> = this.daForm.valueChanges.pipe(
      tap(val => console.log('StartStream: ' + JSON.stringify(val))),
      map((value: {min: string, max: string} ) => this.parseRange(value)),
      pairwise(),
      filter(([oldVal, newVal]) => this.filterMinMaxVals(oldVal, newVal)),
      tap(([oldVal, newVal]) => console.log('Old: ' + JSON.stringify(oldVal) + '  New: ' + JSON.stringify(newVal))),
      map(([oldVal, newVal]) => this.getBoundsAdjustedVal(oldVal, newVal)),
      tap(value => this.updateSliders(value)),
      tap(newVal => this.sales.updateRange(newVal)),
      tap(val => console.log('ValueStream: ' + JSON.stringify(val)))
    );

    this.minValue$ = valueStream$.pipe(
      map(vals => vals.min),
      startWith(this.startMin)
    );

    this.maxValue$ = valueStream$.pipe(
      map(vals => vals.max),
      startWith(this.startMax)
    );

    this.subscriptions.add(() => this.daForm.valueChanges.subscribe());
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private parseRange(value: {min: string, max: string}): Range {
    return {
      min: parseFloat(value.min),
      max: parseFloat(value.max)
    };
  }

  private filterMinMaxVals(oldVal: Range, newVal: Range): boolean {
    return !(oldVal.min === newVal.min && oldVal.max === newVal.max);
  }

  private getBoundsAdjustedVal(oldVal: Range, newVal: Range): Range {
    // Min slider changing
    if (oldVal.min !== newVal.min) {
      if (newVal.min > newVal.max) {
        newVal.max = newVal.min;
      }
      // Max slider changing
    } else if (oldVal.max !== newVal.max) {
      if (newVal.max < newVal.min) {
        newVal.min = newVal.max;
      }
    }

    return newVal;
  }

  private updateSliders(value: Range) {
    this.daForm.setValue(value, {emitEvent: false});
  }
}
