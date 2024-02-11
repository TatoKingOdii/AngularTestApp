import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";

@Component({
  selector: 'test-app-course-lesson',
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatCardTitle],
  templateUrl: './course-lesson.component.html',
  styleUrl: './course-lesson.component.scss',
})
export class CourseLessonComponent {}
