import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent {
  projectForm!: FormGroup;

  industries = ['Finance', 'Telekom', 'Informatike', 'Others'];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      industry: [[]],
      companyName: ['', Validators.required],
      developer: [''],
    });
  }

  onSubmit() {
    if (this.projectForm.valid) {
      console.log(this.projectForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
  navigateToHome() {
    this.router.navigate(['/admin']);
  }
}
