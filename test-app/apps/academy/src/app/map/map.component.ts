import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {filter, fromEvent, map, pairwise, tap} from "rxjs";
import {LineComponent} from "./line/line.component";
import {MatCard} from "@angular/material/card";


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
  selector: 'test-app-map',
  standalone: true,
  imports: [CommonModule, LineComponent, MatCard],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit {
  lines: Line[] = [];

  ngOnInit() {
    fromEvent<MouseEvent>(document, 'click')
      .pipe(
        map((e: MouseEvent) => this.generatePosition(e)),
        filter((p: Position) => p.y > 0 && p.x > 0),
        pairwise(),
        tap(([oldPos, newPos]: [Position, Position]) => console.log('Old Pos: ' + JSON.stringify(oldPos) + '  New Pos: ' + JSON.stringify(newPos))),
        map(([oldPos, newPos]: [Position, Position]) => this.generateCoordinates(oldPos, newPos))
      )
      .subscribe((line: Line) => this.lines = [...this.lines, line]);
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
