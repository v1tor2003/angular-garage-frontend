import { Component } from '@angular/core';
import { CarFormComponent } from '../../components/car-form/car-form.component';
import { Car } from '../../types';
import { CarService } from '../../services/car.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-car',
  standalone: true,
  imports: [CarFormComponent],
  templateUrl: './create-car.component.html',
  styleUrl: './create-car.component.css'
})
export class CreateCarComponent {
  constructor(
    private carService: CarService,
    private location: Location
  ){}
  
  handleCarCreationForm(car: Car): void {
    this.carService.createCar(car).subscribe({
      next:() => this.location.back(),
      error: (err) => console.error('error creating car', err)
    })
  }
}
