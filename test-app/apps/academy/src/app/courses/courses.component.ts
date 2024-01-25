import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'test-app-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {}