import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SalesNumberService} from "../sales-service/sales-number.service";
import {MatCard} from "@angular/material/card";


@Component({
  selector: 'test-app-sales-widget',
  standalone: true,
  imports: [CommonModule, MatCard],
  templateUrl: './sales-widget.component.html',
  styleUrl: './sales-widget.component.scss',
})
export class SalesWidgetComponent implements OnInit{
  minValue!: number;
  maxValue!: number;

  constructor(private sales: SalesNumberService) {}

  ngOnInit() {
    this.sales.range$.subscribe(({min, max}) => {
      this.minValue = min;
      this.maxValue = max;
    });
  }
}
