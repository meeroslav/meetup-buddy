import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  form: FormGroup;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit() {
    const now = new Date();

    this.form = this.fb.group({
      location: ['Stockwerk', Validators.required],
      date: [`${now.getUTCMonth()}`, Validators.required],
    });
  }

  submit() {

  }
}
