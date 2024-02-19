import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {LineComponent} from "./line/line.component";
import {MatCard} from "@angular/material/card";
import {filter, fromEvent, map, pairwise, switchMap, takeUntil, tap} from "rxjs";

export interface Line {
  x1: number,
  y1: number,
  x2: number,
  y2: number
}

interface Position {
  x: number,
  y: number
}

@Component({
  selector: 'test-app-annotate',
  standalone: true,
  imports: [CommonModule, LineComponent, MatCard],
  templateUrl: './annotate.component.html',
  styleUrl: './annotate.component.scss',
})
export class AnnotateComponent implements OnInit {
  lines: Line[] = [];

  ngOnInit() {

    const mouseDown$ = fromEvent<MouseEvent>(document, 'mousedown');
    const mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove');
    const mouseUp$ = fromEvent<MouseEvent>(document, 'mouseup');

    mouseDown$.pipe(
      switchMap(() => mouseMove$.pipe(
        map((e: MouseEvent) => this.generatePosition(e)),
        filter((p: Position) => p.x > 0 && p.y > 0),
        pairwise(),
        map(([oldPos, newPos]: [Position, Position]) => this.generateCoordinates(oldPos, newPos)),
        takeUntil(mouseUp$)
      ))
    ).subscribe((linee: Line) => this.lines = [...this.lines, linee]);
  }

  generatePosition(e: MouseEvent): Position {
    const element = e.target as HTMLElement
    const ref = element.getBoundingClientRect();
    console.log(`Event: ${e.clientX} ${e.clientY}  Offset: ${ref.left} ${ref.top}`);
    if (ref.x == 0 || ref.y == 0) {
      return {x: -1, y: -1};
    }
    return {
      x: e.clientX - ref.left,
      y: e.clientY - ref.top
    }
  }

  generateCoordinates(start: Position, end: Position): Line {
    return {x1: start.x, y1: start.y, x2: end.x, y2: end.y};
  }
}
