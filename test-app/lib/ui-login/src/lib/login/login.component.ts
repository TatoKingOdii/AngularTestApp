import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'test-app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormField, MatInput, MatIconButton, MatIcon, MatButton],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username?: string;
  password?: string;
  errorMsg?: string;
  hide: boolean = true;

  constructor() {}

  submitLogin() {

  }
  handleAuthenticationError = (msg: string) => {
    console.log('Auth error message received: ' + msg);
    this.errorMsg = msg;
    this.username = undefined;
    this.password = undefined;
  }
}
