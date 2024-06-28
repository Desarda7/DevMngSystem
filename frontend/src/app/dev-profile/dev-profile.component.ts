import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Developer } from 'src/models/developer.model';
import { DeveloperServiceService } from 'src/services/developer-service.service';

@Component({
  selector: 'app-dev-profile',
  templateUrl: './dev-profile.component.html',
  styleUrls: ['./dev-profile.component.scss'],
})
export class DevProfileComponent {
  devProfileForm: FormGroup;
  photo: File | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private developerService: DeveloperServiceService
  ) {
    this.devProfileForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
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

  // onSubmit() {
  //   if (this.devProfileForm.valid) {
  //     console.log(this.devProfileForm.value);
  //   } else {
  //     console.log('Form is invalid');
  //   }
  // }
  navigateToHome() {
    this.router.navigate(['/admin']);
  }
  onSubmit(): void {
    if (this.devProfileForm.valid) {
      const newDeveloper: Developer = this.devProfileForm.value;
      this.developerService.createDeveloper(newDeveloper).subscribe(
        (developer) => {
          console.log('Developer added successfully', developer);
          // Optionally reset the form or navigate away
          this.devProfileForm.reset();
        },
        (error) => {
          console.error('Error adding developer', error);
        }
      );
    }
  }
}
