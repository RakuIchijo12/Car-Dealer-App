import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null; // Property to hold success messages
  isSubmitted: boolean = false; 
  
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      isActive: [1, Validators.required]
    });
  }

  submitCredentials() {
    this.isSubmitted = true; // Set the flag to true when attempting to submit
    this.form.markAllAsTouched();
    
    if (this.form.invalid) {
      return;
    } else {
      this.registerUser();
    }
  }

  registerUser() {
    this.userService.registerUser(this.form.getRawValue()).subscribe({
      next: (response) => {
        // If registration is successful, display success message
        this.successMessage = 'You have successfully registered!';
        this.errorMessage = null; // Clear any previous error messages
      },
      error: (error) => {
        // Set error message for already registered user
        this.errorMessage = "This user is already registered";
        this.successMessage = null; // Clear any previous success messages
      }
    });
  }

  navigateLogin() {
    this.router.navigateByUrl('/login');
  }
}
