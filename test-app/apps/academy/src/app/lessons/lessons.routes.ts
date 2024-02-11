import { Route } from '@angular/router';
import {LessonsComponent} from './lessons.component';
import {LessonsStatusComponent} from './lessons-status/lessons-status.component';

export const lessonsRoutes: Route[] = [
  {path: '', component: LessonsComponent,
    children: [
      {path: '', component: LessonsStatusComponent}
    ]}
];
