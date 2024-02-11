import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Course, CoursesService} from "@test-app/core-data";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'test-app-course',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
})
export class CourseComponent implements OnInit {
  currentCourseId: string | null = null;
  currentCourse : Course | null = null;

  constructor(private route: ActivatedRoute,
              private coursesService: CoursesService ) {
  }

  ngOnInit(): void {
        this.currentCourseId = this.route.snapshot.paramMap.get('id');
        this.loadCourse(this.currentCourseId);
    }

  loadCourse(courseId: string | null) {
    this.coursesService.find(courseId)
      .subscribe(course => this.currentCourse = course);
  }
}
