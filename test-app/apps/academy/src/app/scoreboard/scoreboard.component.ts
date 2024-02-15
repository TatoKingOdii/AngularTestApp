import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCard} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {fromEvent, scan, startWith} from "rxjs";

@Component({
  selector: 'test-app-scoreboard',
  standalone: true,
  imports: [CommonModule, MatCard, MatButton],
  templateUrl: './scoreboard.component.html',
  styleUrl: './scoreboard.component.scss',
})
export class ScoreboardComponent implements AfterViewInit {

  @ViewChild('btn') btn!: MatButton;
  count: number = 0;

  ngAfterViewInit(): void {
    fromEvent<number>(this.getNativeElement(this.btn), 'click')
      .pipe(
        startWith(this.count),
        scan((acc: number, curr: number) => acc + 1)
      )
      .subscribe(count => this.count = count);
  }

  getNativeElement(element: MatButton) {
    return element._elementRef.nativeElement;
  }
}
