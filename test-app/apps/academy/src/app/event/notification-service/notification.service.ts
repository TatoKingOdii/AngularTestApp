import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private subject: Subject<string> = new Subject();
  notification$ = this.subject.asObservable();

  dispatch(msg: string) {
    this.subject.next(msg);
  }
}
