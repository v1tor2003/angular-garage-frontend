import { Component } from '@angular/core';
import { CarFormComponent } from '../../components/car-form/car-form.component';
import { Car } from '../../types';
import { CarService } from '../../services/car.service';
import { Location } from '@angular/common';

/**
 * Component responsible for handling the creation of a new car.
 * It integrates the car form and submits the form data to the CarService.
 */
@Component({
  selector: 'app-create-car',
  standalone: true,
  imports: [CarFormComponent],
  templateUrl: './create-car.component.html',
  styleUrl: './create-car.component.css'
})
export class CreateCarComponent {

  /**
   * Constructs the CreateCarComponent and injects the necessary services.
   * 
   * @param {CarService} carService - The service responsible for car-related operations.
   * @param {Location} location - Angular's Location service for navigating back in the browser history.
   */
  constructor(
    private carService: CarService,
    private location: Location
  ){}
  
  /**
   * Handles the car creation form submission.
   * Submits the new car data to the CarService and navigates back on success.
   * 
   * @param {Car} car - The car object containing form data to be created.
   * @returns {void}
  */
  handleCarCreationForm(car: Car): void {
    this.carService.createCar(car).subscribe({
      next:() => this.location.back(),
      error: (err) => console.error('error creating car', err)
    })
  }
}
