import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
// @ts-ignore
import dateFormat from 'dateformat';
import { preset } from './presets/angular-vienna';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  form: FormGroup;
  // make it public so we can access it from the view
  PARTNERS = 'partners';
  SPONSORS = 'sponsors';
  SPEAKERS = 'speakers';

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
  }

  preFillForAngularVienna() {
    this.form.controls.location.setValue(preset.location);
    this.form.controls.backgroundUrl.setValue(preset.backgroundUrl);
    this.form.controls.logoUrl.setValue(preset.logoUrl);
    this.form.controls.eventHeadline.setValue(preset.eventHeadline);
    this.form.setControl(this.PARTNERS, new FormArray(preset.partners.map(partner =>
      this.fb.group({
        logoUrl: [partner.logoUrl, Validators.required]
      }))));
  }

  // https://stackoverflow.com/questions/51214548/angular-5-with-canvas-drawimage-not-showing-up

  submit() {
    console.log(this.form.value);
    console.log(dateFormat(this.form.value.date, DATE_FORMAT));
  }

  addNewPartner() {
    (this.form.controls.partners as FormArray).push(this.fb.group({
      logoUrl: ['', Validators.required]
    }));
  }

  addNewSponsor() {
    (this.form.controls.sponsors as FormArray).push(this.fb.group({
      logoUrl: ['', Validators.required]
    }));
  }

  addNewSpeaker() {
    (this.form.controls.speakers as FormArray).push(this.fb.group({
      name: ['', Validators.required],
      talkTitle: ['', Validators.required],
      imageUrl: ['', Validators.required],
    }));
  }

  removeFormItem(arrayName: string, group: AbstractControl) {
    this.form.setControl(arrayName, new FormArray((this.form.get(arrayName) as FormArray).controls.filter(control => control !== group)));
  }

  private initializeForm() {
    this.form = this.fb.group({
      location: ['', Validators.required],
      date: [new Date(), Validators.required],
      backgroundUrl: [''],
      logoUrl: [''],
      eventHeadline: [''],
      [this.SPONSORS]: this.fb.array([]),
      [this.SPEAKERS]: this.fb.array([], Validators.required),
      [this.PARTNERS]: this.fb.array([])
    });
  }
}
