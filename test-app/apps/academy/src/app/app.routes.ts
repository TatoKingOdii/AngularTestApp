import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import {CourseComponent} from "./courses/course/course.component";
import {CourseLessonComponent} from "./courses/course-lessons/course-lesson.component";
import {authGuard} from "../../../../lib/core-data/src/lib/guards/auth.guard";
import {InverseTextComponent} from "./inverse-text/InverseText.component";
import {ScoreboardComponent} from "./scoreboard/scoreboard.component";
import {SlideshowComponent} from "./slideshow/slideshow.component";
import {GameComponent} from "./game/game.component";
import {MapComponent} from "./map/map.component";
import {AnnotateComponent} from "./annotate/annotate.component";
import {LocationComponent} from "./location/location.component";
import {SliderComponent} from "./slider/slider.component";
import {EventComponent} from "./event/event.component";

export const appRoutes: Route[] = [
  {path: 'home', component: HomeComponent},
  {path: 'invText', component: InverseTextComponent},
  {path: 'scoreboard', component: ScoreboardComponent},
  {path: 'slideshow', component: SlideshowComponent},
  {path: 'game', component: GameComponent},
  {path: 'map', component: MapComponent},
  {path: 'annotate', component: AnnotateComponent},
  {path: 'location', component: LocationComponent},
  {path: 'slider', component: SliderComponent},
  {path: 'event', component: EventComponent},
  {path: 'lessons', loadChildren: () => import('./lessons/lessons.routes').then(mod => mod.lessonsRoutes)},
  {path: 'admin', component: HomeComponent, canActivate: [authGuard]},
  {path: 'courses', component: CoursesComponent,
    children: [
      {path: '', component: CourseLessonComponent}
    ]
  },
  {path: 'courses/:id', component: CourseComponent},
  {path: 'login', loadChildren: () => import('@test-app/ui-login').then(mod => mod.libUiLoginRoutes)},
  {path: '**', redirectTo: '/home'}
];
