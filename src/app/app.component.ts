import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { preset } from './presets/angular-vienna';

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
      location: ['', Validators.required],
      date: [`${now.getUTCMonth()}`, Validators.required],
      backgroundUrl: ['', Validators.required],
      logoUrl: [''],
      eventHeadline: ['', Validators.required],
      sponsors: this.fb.array([]),
      speakers: this.fb.array([]),
      partners: this.fb.array([])
    });
  }

  preFillForAngularVienna() {
    this.form.controls.location.setValue(preset.location);
    this.form.controls.date.setValue(preset.date);
    this.form.controls.backgroundUrl.setValue(preset.backgroundUrl);
    this.form.controls.logoUrl.setValue(preset.logoUrl);
    this.form.controls.eventHeadline.setValue(preset.eventHeadline);
    this.form.controls.partners.setValue(preset.partners.map(partner => this.fb.group({
      logoUrl: [partner.logoUrl, Validators.required]
    })));
  }

  submit() {
    console.log(this.form.value);
  }
}
