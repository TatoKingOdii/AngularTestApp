import {Component, OnInit} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {NgForOf} from "@angular/common";
import {first, timer} from "rxjs";

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
    {title: 'Lessons',location: '/lessons', icon: 'list'}
  ];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    const trigger = timer(500000);
    trigger
      .pipe(first())
      .subscribe(() => this.logout());
  }

  private logout() {
    this.router.navigateByUrl('/login')
  }
}
