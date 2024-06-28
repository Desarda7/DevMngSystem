import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Developer } from 'src/models/developer.model';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeveloperServiceService } from 'src/services/developer-service.service';

@Component({
  selector: 'app-edit-developer-dialog',
  templateUrl: './edit-developer-dialog.component.html',
  styleUrls: ['./edit-developer-dialog.component.scss'],
})
export class EditDeveloperDialogComponent {
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditDeveloperDialogComponent>,
    private router: Router,
    private developerService: DeveloperServiceService,
    @Inject(MAT_DIALOG_DATA) public data: Developer
  ) {
    this.editForm = this.fb.group({
      name: [data.name, Validators.required],
      surname: [data.surname, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      experienceLevel: [data.experienceLevel, Validators.required],
      frontend: [data.skills.includes('Frontend')],
      backend: [data.skills.includes('Backend')],
      database: [data.skills.includes('Database')],
      devops: [data.skills.includes('DevOps')],
    });
  }

  // onSubmit() {
  //   if (this.editForm.valid) {
  //     const updatedDeveloper: Developer = {
  //       ...this.data,
  //       name: this.editForm.value.emer,
  //       surname: this.editForm.value.mbiemer,
  //       email: this.editForm.value.email,
  //       experienceLevel: this.editForm.value.experienceLevel,
  //       skills: this.getSelectedSkills(),
  //     };

  //     this.dialogRef.close(updatedDeveloper);
  //   }
  // }
  onSubmit(): void {
    if (this.editForm.valid) {
      const updatedDeveloper: Developer = this.editForm.value;
      this.developerService.updateDeveloper(updatedDeveloper).subscribe(
        (developer) => {
          console.log('Developer updated successfully', developer);
          this.dialogRef.close(developer);
        },
        (error) => {
          console.error('Error updating developer', error);
        }
      );
    }
  }

  private getSelectedSkills(): string[] {
    const skills: string[] = [];
    if (this.editForm.value.frontend) skills.push('Frontend');
    if (this.editForm.value.backend) skills.push('Backend');
    if (this.editForm.value.database) skills.push('Database');
    if (this.editForm.value.devops) skills.push('DevOps');
    return skills;
  }
  navigateToHome() {
    this.router.navigate(['/admin']);
  }
}
