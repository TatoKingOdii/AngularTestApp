import {Component, OnInit} from '@angular/core';

import { CommonModule } from '@angular/common';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatActionList, MatList, MatListItem} from "@angular/material/list";
import {MatLine} from "@angular/material/core";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatFormField} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatSlider, MatSliderThumb} from "@angular/material/slider";
import {MatCheckbox} from "@angular/material/checkbox";
import {Course} from "@test-app/core-data";
import {CoursesService} from "@test-app/core-data";
import {map, tap} from "rxjs";
import {RouterOutlet} from "@angular/router";



@Component({
  selector: 'test-app-courses',
  standalone: true,
  imports: [CommonModule, MatCard, MatCardHeader,
    MatCardContent, MatList, MatListItem,
    MatLine, MatCardTitle, MatActionList, MatCardActions, MatButton,
    MatIconButton, MatIcon, MatFormField, FormsModule, MatInput, MatSlider, MatSliderThumb, MatCheckbox, RouterOutlet],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent implements OnInit {
  currentCourse: Course = this.emptyCourse();
  courses: Course[] = [];

  constructor(private coursesService: CoursesService) {}
  ngOnInit(): void {
    this.getCourses();
    this.resetCourse()
  }

  private getCourses() {
    this.coursesService.all()
      .pipe(
        tap(courses => console.log('Courses Tap', courses)),
        map(courses => courses.filter(course => course.favorite)),
        map(courses => courses.map(course => this.transformCourse(course)))
      )
      .subscribe({
        next: (courses) => {
          this.courses = courses;
          console.log('Courses received: ' + JSON.stringify(courses))
        },
        error: (error) => {
          window.alert(`AAAAA ITS ON FIRE! ${error}`)
        }
      });
  }

  private transformCourse(course: Course) : Course {
    return Object.assign({}, course, {
      title: course.title.toUpperCase()
    })
  }

  selectCourse(course: Course) {
    this.currentCourse = course
  }


  cancel() {
    this.resetCourse()
  }

  updateCourse(course: Course) {
    this.coursesService.update(course)
      .subscribe(
        {next: () => this.refreshCourses(),
        error: (error) => {
          window.alert(`AAAAA ITS ON FIRE! ${error}`)
        }});
  }

  createCourse(course: Course) {
    this.coursesService.create(course)
      .subscribe({next: () => this.refreshCourses(),
        error: (error) => {
          window.alert(`AAAAA ITS ON FIRE! ${error}`)
        }});
  }

  deleteCourse(course: Course) {
    this.coursesService.delete(course)
      .subscribe({next: () => this.refreshCourses(),
        error: (error) => {
          window.alert(`AAAAA ITS ON FIRE! ${error}`)
        }});
  }

  private resetCourse() {
    this.selectCourse(this.emptyCourse())
  }

  saveCourse(currentCourse: Course) {
    if (currentCourse.id) {
      this.updateCourse(currentCourse)
    } else {
      this.createCourse(currentCourse)
    }
  }

  private emptyCourse() {
    const emptyCourse: Course = {
      description: "",
      favorite: false,
      id: "",
      percentageComplete: 0,
      title: ""
    }
    return emptyCourse;
  }

  private refreshCourses() {
    this.getCourses();
    this.resetCourse();
  }
}
