import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Car } from '../../types';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Location } from '@angular/common';

@Component({
  selector: 'app-car-form',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './car-form.component.html',
  styleUrl: './car-form.component.css'
})
export class CarFormComponent implements OnInit{
  @Input() car?: Car
  @Output() submitForm = new EventEmitter<Car>()
  carForm: FormGroup

  constructor(
    private location: Location
  ){
    this.carForm = new FormGroup({
      id: new FormControl(this.car?.id),
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

  get model() {
    return this.carForm.get('model')
  }

  get year() {
    return this.carForm.get('year')
  }

  get brand() {
    return this.carForm.get('brand')
  }

  onCancel(): void {
    this.location.back()
  }

  async onSubmit(): Promise<void> {
    if(this.carForm.valid) {
      const formData = this.carForm.value
      this.submitForm.emit(formData)
      console.log('Emitted, ', formData )
    }
    else console.log('invalid form')
  }
}
