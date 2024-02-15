import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  filter,
  fromEvent,
  interval,
  map,
  merge,
  Observable,
  repeat,
  startWith,
  Subscription,
  take, tap
} from "rxjs";
import {MatCard} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";

interface Coordinate {
  x: number,
  y: number
}

const SHIP_OFFSET: number = 160;
const FIRING_OFFSET: number = -15;

@Component({
  selector: 'test-app-game',
  standalone: true,
  imports: [CommonModule, MatCard, MatIcon],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements OnInit, OnDestroy {

  backgroundPosition: number =  0;
  shipPosition: Coordinate = {x: 100, y: 500};
  shots: Coordinate[] = [];

  background$! : Subscription;
  shots$! : Subscription;
  leftArrow$! : Observable<number>;
  rightArrow$! : Observable<number>;

  ngOnInit(): void {
    this.background$ = interval(30)
      .pipe(
        startWith(10),
        take(150),
        repeat()
      )
      .subscribe(count => {
        this.backgroundPosition = count;
        this.moveShots();
      });

    this.shots$ = fromEvent<KeyboardEvent>(document, 'keydown')
      .pipe(
        filter((event: KeyboardEvent) => event.key === 'Control'),
        map((): Coordinate => ({
          x: this.shipPosition.x + SHIP_OFFSET,
          y: this.shipPosition.y + FIRING_OFFSET
        }))
      )
      .subscribe(shot => this.shots = [...this.shots, shot]);

    this.leftArrow$ = fromEvent<KeyboardEvent>(document, 'keydown')
      .pipe(
        filter((event: KeyboardEvent) => event.key === 'ArrowLeft'),
        map(() => -10),
        tap(() => console.log('Left'))
      );

    this.rightArrow$ = fromEvent<KeyboardEvent>(document, 'keydown')
      .pipe(
        filter((event: KeyboardEvent) => event.key === 'ArrowRight'),
        map(() => 10),
        tap(() => console.log('Right'))
      );

    merge(this.leftArrow$, this.rightArrow$)
      .pipe(
        map(value => this.shipPosition.x + value)
      )
      .subscribe((value: number) => {
        this.shipPosition = {...this.shipPosition, x: value};
        console.log(JSON.stringify(this.shipPosition));
      });
  }

  ngOnDestroy(): void {
    this.background$.unsubscribe();
    this.shots$.unsubscribe();
  }

  moveShots() {
    const newShots: Coordinate[] = [];
    this.shots.forEach(shot => {
      if (shot.y > -35) {
        newShots.push({...shot, y: shot.y - 15})
      }
    });
    this.shots = newShots;
  }
}
