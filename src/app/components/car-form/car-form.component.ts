import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Car } from '../../types';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Location } from '@angular/common';

/**
 * Component representing a form for creating or editing a car.
 * 
 * @template {Car} The type of car data managed by the form.
*/
@Component({
  selector: 'app-car-form',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './car-form.component.html',
  styleUrl: './car-form.component.css'
})
export class CarFormComponent implements OnInit{
  @Input() car?: Car // Optional car object for when editing an existing car.
  @Output() submitForm = new EventEmitter<Car>() // Event emitted when the form is submitted with valid data.
  carForm: FormGroup // Angular's reactive form group for the car form.

  /**
   * Constructs the CarFormComponent and initializes the form group.
   * 
   * @param {Location} location - The location service to handle navigation.
  */
  constructor(
    private location: Location
  ){
    this.carForm = new FormGroup({
      ...(this.location.isCurrentPathEqualTo('/create') ? {} : { id: new FormControl(this.car?.id) }),
      brand: new FormControl(this.car?.brand, [
        Validators.required,
        Validators.minLength(3)
      ]),
      model: new FormControl(this.car?.model, [
        Validators.required
      ]) ,
      year: new FormControl(this.car?.year, [
        Validators.required,
        Validators.min(1901)
      ]) 
    })
  }

  /**
   * Initializes the component and patches the form with existing car data if available.
   * 
   * @returns {void}
  */
  ngOnInit(): void {
    if (this.car) {
      this.carForm.patchValue({
        id: this.car.id,
        brand: this.car.brand,
        model: this.car.model,
        year: this.car.year
      })
    }
  }

  /**
   * Getter for the model form control.
   * 
   * return FormControl
  */
  get model() {
    return this.carForm.get('model')
  }

  /**
   * Getter for the year form control.
   * 
   * return FormControl
  */
  get year() {
    return this.carForm.get('year')
  }

  /**
   * Getter for the brand form control.
   * 
   * return FormControl
  */
  get brand() {
    return this.carForm.get('brand')
  }

  /**
   * Cancels the form operation and navigates back to the previous page.
   * 
   * @returns {void}
  */
  onCancel(): void {
    this.location.back()
  }

  /**
   * Handles form submission, emitting the form data if valid.
   * TO BE REMOVED: console.log('Emitted, ', formData ), used only for debug propurses
   * @returns {Promise<void>}
   */
  async onSubmit(): Promise<void> {
    if(this.carForm.valid) {
      const formData = this.carForm.value
      this.submitForm.emit(formData)
      console.log('Emitted, ', formData )
    }
    else console.log('invalid form')
  }
}
