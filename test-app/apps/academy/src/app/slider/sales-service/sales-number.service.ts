import { Injectable } from '@angular/core';
import {Range} from "../slider.component";
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesNumberService {
  private range: Subject<Range> = new Subject<Range>()
  range$: Observable<Range> = this.range.asObservable();

  constructor() { }

  updateRange(range: Range) {
    this.range.next(range);
  }
}
