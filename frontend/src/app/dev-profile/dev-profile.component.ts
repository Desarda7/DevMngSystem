import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dev-profile',
  templateUrl: './dev-profile.component.html',
  styleUrls: ['./dev-profile.component.scss'],
})
export class DevProfileComponent {
  devProfileForm: FormGroup;
  photo: File | null = null;

  constructor(private fb: FormBuilder) {
    this.devProfileForm = this.fb.group({
      emer: ['', Validators.required],
      mbiemer: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      experienceLevel: ['', Validators.required],
      frontend: [false],
      backend: [false],
      database: [false],
      devops: [false],
      photo: [null, Validators.required],
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.photo = input.files[0];
      this.devProfileForm.patchValue({
        photo: this.photo,
      });
    }
  }

  onSubmit() {
    if (this.devProfileForm.valid) {
      console.log(this.devProfileForm.value);
      // Perform your form submission logic here
    } else {
      console.log('Form is invalid');
    }
  }
}
