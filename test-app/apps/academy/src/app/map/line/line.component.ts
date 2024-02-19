import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Line} from "../map.component";

@Component({
  selector: 'test-app-line',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './line.component.html',
  styleUrl: './line.component.scss',
})
export class LineComponent {
  @Input() line!: Line;
}
