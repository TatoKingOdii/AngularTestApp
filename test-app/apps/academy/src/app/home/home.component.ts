import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatList, MatListItem} from "@angular/material/list";
import {MatLine} from "@angular/material/core";
import {LessonsService} from "@test-app/core-data";

@Component({
  selector: 'test-app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatFormField, MatLabel,
    FormsModule, MatButton, MatList, MatListItem, MatLine],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  message = "Big Potatoes"
  currentColor = "blue"
  currentLesson = null
  courseTitle = 'Angular Fundamentals'
  courseLessons = [
    { title: 'Hi Hi' },
    { title: 'Component Fundamentals' },
    { title: 'Template Driven' },
    { title: 'Services' },
    { title: 'Server Comm' },
    { title: 'Routing' },
    { title: 'Unit Tests' },
    { title: 'Component Driven' }
  ]

  constructor(private lessonService: LessonsService) {

  }
  updateColor() {
    this.currentColor = "purple"
  }

  selectLesson({lesson}: { lesson: any }) {
    this.currentLesson = lesson
  }

  ngOnInit(): void {
    //do nothing
  }

  resetLesson() {
    this.currentLesson = null
  }
}
