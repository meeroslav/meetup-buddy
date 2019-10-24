import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  FACEBOOK_POST_HEIGHT,
  FACEBOOK_POST_WIDTH,
  MEETUP_FEATURE_HEIGHT,
  MEETUP_FEATURE_WIDTH, TWITTER_POST_HEIGHT,
  TWITTER_POST_WIDTH
} from './constants/sizes';
// @ts-ignore
import { render } from './drawing/renderer';
import { preset } from './presets/angular-vienna';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('canvasContainer', { static: true }) canvasContainer: ElementRef;

  form: FormGroup;
  // make it public so we can access it from the view
  PARTNERS = 'partners';
  SPONSORS = 'sponsors';
  SPEAKERS = 'speakers';

  constructor(private readonly fb: FormBuilder) { }

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

  submit() {
    this.canvasContainer.nativeElement.innerHTML = '';
    // TWITTER
    this.canvasContainer.nativeElement.append(
      render(TWITTER_POST_WIDTH, TWITTER_POST_HEIGHT, this.form.value, 'twitter')
    );
    // MEETUP
    this.canvasContainer.nativeElement.append(
      render(MEETUP_FEATURE_WIDTH, MEETUP_FEATURE_HEIGHT, this.form.value, 'meetup')
    );
    // FACEBOOK
    this.canvasContainer.nativeElement.append(
      render(FACEBOOK_POST_WIDTH, FACEBOOK_POST_HEIGHT, this.form.value, 'facebook')
    );
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
      imageUrl: ['https://imgur.com/MdlUjdz', Validators.required],
    }));
  }

  removeFormItem(arrayName: string, group: AbstractControl) {
    this.form.setControl(arrayName, new FormArray((this.form.get(arrayName) as FormArray).controls.filter(control => control !== group)));
  }

  saveImages() {
    const children = this.canvasContainer.nativeElement.children;
    for (const canvas of children) {
      this.saveImage(canvas);
    }
  }

  private saveImage(canvas: HTMLCanvasElement) {
    const fileName = `${canvas.id}.png`;
    const link = document.createElement('a');
    link.setAttribute('download', fileName);
    link.setAttribute('href', canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream'));
    link.click();
    link.remove();
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
