import { Component, inject, signal } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import deepEqual from 'deep-equal';
import { DEFAULT_PERSONAL_INFO, PersonalInfo } from '../../../interfaces';
import { CvDataService } from '../../../services';
import {
  ButtonComponent,
  DeletableItemComponent,
  ExpandableSectionComponent,
  TextInputComponent,
} from '../../../shared';
import { BaseStepComponent } from '../base-step.component';

@Component({
  selector: 'app-personal-info',
  imports: [
    TextInputComponent,
    ReactiveFormsModule,
    ExpandableSectionComponent,
    ButtonComponent,
    DeletableItemComponent,
  ],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.css',
})
export class PersonalInfoComponent extends BaseStepComponent<PersonalInfo> {
  private cvDataService = inject(CvDataService);

  form = new FormGroup({
    name: new FormControl('John Silva', [Validators.required]),
    jobTitle: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email]),
    phone: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    stateProvince: new FormControl(''),
    postalCode: new FormControl(''),
    country: new FormControl(''),
    idNumber: new FormControl(''),
    birthDate: new FormControl(''),
    nationality: new FormControl(''),
    drivingLicense: new FormControl(''),
    socialLinks: new FormArray<
      FormGroup<{
        title: FormControl<string | null>;
        link: FormControl<string | null>;
      }>
    >([]),
  });

  initialSocialLinksLength = signal(0);
  initialExtraInfoExpanded = signal(false);

  override ngOnInit(): void {
    super.ngOnInit();

    const currentPersonalInfo = this.cvDataService.data().personalInfo;

    currentPersonalInfo.socialLinks.forEach((link) => {
      this.socialLinks.push(
        new FormGroup({
          title: new FormControl<string>(link.title),
          link: new FormControl<string>(link.link),
        })
      );
    });

    this.initialSocialLinksLength.set(this.socialLinks.length);

    this.form.patchValue({
      ...currentPersonalInfo,
      socialLinks: undefined,
    });

    if (!deepEqual(currentPersonalInfo, DEFAULT_PERSONAL_INFO)) {
      this.form.markAllAsTouched();
    }

    if (
      !deepEqual(
        {
          idNumber: currentPersonalInfo.idNumber,
          birthDate: currentPersonalInfo.birthDate,
          nationality: currentPersonalInfo.nationality,
          drivingLicense: currentPersonalInfo.drivingLicense,
        },
        { idNumber: '', birthDate: '', nationality: '', drivingLicense: '' }
      )
    ) {
      this.initialExtraInfoExpanded.set(true);
    }
  }

  get socialLinks() {
    return this.form.get('socialLinks') as FormArray<
      FormGroup<{
        title: FormControl<string | null>;
        link: FormControl<string | null>;
      }>
    >;
  }

  getSocialLinkControl(
    socialLinkControl: FormGroup<{
      title: FormControl<string | null>;
      link: FormControl<string | null>;
    }>,
    controlName: string
  ): FormControl<string> {
    return socialLinkControl.get(controlName) as FormControl<string>;
  }

  addSocialLink(): void {
    this.socialLinks.push(
      new FormGroup({
        title: new FormControl<string>(''),
        link: new FormControl<string>(''),
      })
    );
    if (this.socialLinks.length < this.initialSocialLinksLength()) {
      this.initialSocialLinksLength.set(this.socialLinks.length);
    }
  }

  removeSocialLink(index: number): void {
    this.socialLinks.removeAt(index);
    if (this.socialLinks.length < this.initialSocialLinksLength()) {
      this.initialSocialLinksLength.set(this.socialLinks.length);
    }
  }

  override onFormValueChanged(v: PersonalInfo): void {
    this.cvDataService.data.update((d) => ({ ...d, personalInfo: v }));
  }
}
