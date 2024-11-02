import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarsService } from '../../services/cars.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent {
  form: FormGroup;
  errorMessage: string | null = null;  // Property to hold error messages
  successMessage: string | null = null; // Property to hold success messages

  constructor(
    private formBuilder: FormBuilder,
    private carsService: CarsService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      make: ['', Validators.required],
      description: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1886)]],
      price: ['', [Validators.required, Validators.min(0)]],
    });
  }

  formatPrice(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // If the input is empty, set it to an empty string
    if (value === '') {
      input.value = '';
      return;
    }

    // Remove any non-digit characters (except for commas)
    const numericValue = value.replace(/[^0-9]/g, '');

    // Format the numeric value with commas
    input.value = this.addCommas(numericValue);
  }

  // Function to add commas to the numeric value
  addCommas(value: string) {
    const numberValue = Number(value);
    return isNaN(numberValue) ? '' : numberValue.toLocaleString('en-US');
  }

  submitDetails() {
    this.errorMessage = null;  // Reset error message at the start
    this.successMessage = null; // Reset success message at the start

    if (this.form.valid) {
      const priceValue = this.form.get('price')?.value.replace(/,/g, ''); // Remove commas
      this.form.patchValue({ price: priceValue }); // Update the form value

      this.carsService.createCars(this.form.getRawValue()).subscribe({
        next: (response) => {
          this.form.reset();
          this.successMessage = 'Car added successfully!'; // Set success message
          this.router.navigateByUrl('/cars');
        },
        error: (error) => {
          if (error.status === 409) { // Adjust based on your backend's response for duplicate
            this.errorMessage = 'This car is already added.';
          } else {
            this.errorMessage = 'This car is already added.';
          }
        }
      });
    } else {
      this.errorMessage = "Please fill in all required fields.";
      this.markAllFieldsAsTouched();
    }
  }

  markAllFieldsAsTouched() {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }
}
