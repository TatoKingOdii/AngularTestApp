import {Component, OnInit} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {NgForOf} from "@angular/common";
import {first, timer} from "rxjs";
import {NotificationService} from "./event/notification-service/notification.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  standalone: true,
  imports: [RouterModule, MatSidenav, MatToolbar, MatMiniFabButton,
    MatSidenavContainer, MatIcon, MatIconButton, MatSidenavContent, NgForOf, MatButton],
  selector: 'test-app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Academy';
  pages = [
    {title: 'Home', location: '/home', icon: 'home'},
    {title: 'Courses',location: '/courses', icon: 'list'},
    {title: 'Lessons',location: '/lessons', icon: 'list'},
    {title: 'Inverse Text', location: '/invText', icon: 'V'},
    {title: 'Scoreboard', location: '/scoreboard', icon: 'scoreboard'},
    {title: 'Slideshow', location: '/slideshow', icon: 'photo'},
    {title: 'Game', location: '/game', icon: 'games'},
    {title: 'Map', location: '/map', icon: 'map'},
    {title: 'Annotate', location: '/annotate', icon: 'edit'},
    {title: 'Location', location: '/location', icon: 'my_location'},
    {title: 'Slider', location: '/slider', icon: 'linear_scale'},
    {title: 'Event', location: '/event', icon: 'event'}
  ];

  constructor(private router: Router, private noti: NotificationService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    const trigger = timer(500000);
    trigger
      .pipe(first())
      .subscribe(() => this.logout());

    this.noti.notification$.subscribe(notification => this.showNotification(notification));
  }

  private logout() {
    this.router.navigateByUrl('/login')
  }

  private showNotification(notification: string) {
    this.snackBar.open(notification, 'OK', {duration: 5000, direction: 'ltr'});
  }
}
