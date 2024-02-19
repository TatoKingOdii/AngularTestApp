import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCard} from "@angular/material/card";
import {
  combineLatest,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  merge,
  startWith,
  tap
} from "rxjs";
import {gsap} from 'gsap';
gsap.registerPlugin();

interface Position {
  x: number,
  y: number
}

@Component({
  selector: 'test-app-location',
  standalone: true,
  imports: [CommonModule, MatCard],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss',
})
export class LocationComponent implements OnInit {
  @ViewChild('pin') pin!: ElementRef;

  ngOnInit() {

    const mouseDown$ = fromEvent<MouseEvent>(document, 'mousedown');
    const mouseUp$ = fromEvent<MouseEvent>(document, 'mouseup');
    const keydown$ = fromEvent<KeyboardEvent>(document, 'keydown');
    const keyUp$ = fromEvent<KeyboardEvent>(document, 'keyup');

    // Move It
    mouseDown$.pipe(map((e: MouseEvent) => {
      e.preventDefault();
      return this.generatePosition(e);
    }))
    .subscribe((p: Position) => gsap.to(this.pin.nativeElement, 1, p) )

    // Spin it
    const leftDown$ = mouseDown$.pipe( map(() => true));
    const leftUp$ = mouseUp$.pipe(map(() => false));
    const cmdDown$ = keydown$.pipe(filter((event) => event.key === 'Meta'), map(() => true));
    const cmdUp$ = keyUp$.pipe(filter((event) => event.key === 'Meta'), map(() => false));

    const key$ = merge(cmdDown$, cmdUp$).pipe(startWith(false));
    const mouse$ = merge(leftDown$, leftUp$).pipe(startWith(false));

    const anim = gsap.to('.pin', {duration: 1, rotation: 360, onStart: () => console.log('Started'), paused: true});

    combineLatest([key$, mouse$]).pipe(
      tap(([mouseDown, keyDown]) => console.log(mouseDown + '  ' + keyDown)),
      map(([mouseDown, keyDown]) => mouseDown && keyDown),
      distinctUntilChanged()
    ).subscribe((bool) => {
      console.log('Curr: ' + bool);
      if (bool) {
        anim.play(0);
      }
    });
  }

  generatePosition(e: MouseEvent): Position {
    const element = e.target as HTMLElement
    const ref = element.getBoundingClientRect();
    console.log(`Event: ${e.clientX} ${e.clientY}  Offset: ${ref.left} ${ref.top}`);
    if (ref.x == 0 || ref.y == 0) {
      return {x: -1, y: -1};
    }
    return {
      x: e.clientX - ref.left - 20,
      y: e.clientY - ref.top - 20
    }
  }
}
