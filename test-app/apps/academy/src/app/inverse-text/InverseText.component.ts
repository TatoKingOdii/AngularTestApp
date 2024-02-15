import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {map} from "rxjs";
import {MatCard} from "@angular/material/card";

@Component({
  selector: 'test-app-inverse-text',
  standalone: true,
  imports: [CommonModule, MatFormField, MatInput, MatLabel, ReactiveFormsModule, MatCard],
  templateUrl: './InverseText.component.html',
  styleUrl: './InverseText.component.scss',
})
export class InverseTextComponent implements OnInit {

  fc: FormControl = new FormControl('');
  currentText?: string;

  ngOnInit(): void {

    this.fc.valueChanges
      .pipe(map(value => encodeURIComponent(value.toUpperCase().split('').reverse().join(''))))
      .subscribe(value => this.currentText = value);
  }
}
