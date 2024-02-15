import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {fromEvent, map, merge, scan, startWith, tap} from "rxjs";
import {MatButton} from "@angular/material/button";
import {MatCard} from "@angular/material/card";

const images: string[] = [
  'https://cataas.com/cat',
  'https://cataas.com/cat/angry',
  'https://cataas.com/cat/cute',
  'https://cataas.com/cat/sleepy',
  'https://cataas.com/cat/fat',
  'https://cataas.com/cat/halloween'
] ;

interface Move {
  shift?: number,
  direction: Direction
}

interface Position {
  index?: number,
  direction: Direction
}

enum Direction {
  right = 'right',
  left = 'left'
}

@Component({
  selector: 'test-app-slideshow',
  standalone: true,
  imports: [CommonModule, MatCard, MatButton],
  templateUrl: './slideshow.component.html',
  styleUrl: './slideshow.component.scss',
})
export class SlideshowComponent implements AfterViewInit {
  @ViewChild('previous') previous!: MatButton;
  @ViewChild('next') next!: MatButton;

  images: string[] = images;
  currentPos: Position = {
    index: 0,
    direction: Direction.left
  }

  ngAfterViewInit(): void {
    console.log('Stuff is happening');
    const previous$ = fromEvent<Move>(this.getNativeElement(this.previous), 'click')
      .pipe(
        tap(() => console.log('Prev Click')),
        map(() : Move => {return ({shift: -1, direction: Direction.left})})
      );

    const next$ = fromEvent<Move>(this.getNativeElement(this.next), 'click')
      .pipe(
        tap(() => console.log('Next Click')),
        map((): Move => {return ({shift: 1, direction: Direction.right})})
      );

    merge(previous$, next$)
      .pipe(
        startWith(this.currentPos),
        scan((acc: Position, value: Move) : Position => {
          console.log(`Updating with accumulated: ${JSON.stringify(acc)} & value: ${JSON.stringify(value)}`)
          const adjustedIdx: number =
            this.getAdjustedIndex(acc.index ? acc.index : 0, value.shift ? value.shift : 0);
          return {index: adjustedIdx, direction: value.direction};
        })
      )
      .subscribe((pos: Position) => {
        this.currentPos = pos;
      });
  }

  getAdjustedIndex(current: number, shift: number) : number {
    const newIdx: number = current + shift;
    const length: number = this.images.length;
    return this.adjustForMin(length, this.adjustForMax(length, newIdx));
  }

  adjustForMin(length: number, idx: number) : number {
    return idx < 0 ? length - 1: idx;
  }

  adjustForMax(length: number, idx: number) : number {
    return idx >= length ? 0: idx;
  }

  getNativeElement(element: MatButton) {
    return element._elementRef.nativeElement;
  }
}
