import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {NotificationService} from "./notification-service/notification.service";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'test-app-event',
  standalone: true,
  imports: [CommonModule, MatFormField, MatInput, ReactiveFormsModule, MatButton],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss',
})
export class EventComponent {
  searchControl: FormControl = new FormControl('');

  constructor(private notiService: NotificationService) {
  }

  notify(msg: string) {
    this.notiService.dispatch(msg);
  }
}
