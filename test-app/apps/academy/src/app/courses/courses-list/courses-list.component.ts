import
{ Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'test-app-courses-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss',
})
export class CoursesListComponent {}
