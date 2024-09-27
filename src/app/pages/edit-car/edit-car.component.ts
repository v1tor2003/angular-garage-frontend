import { Component, Input, OnInit } from '@angular/core';
import { Car } from '../../types';
import { CarService } from '../../services/car.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CarFormComponent } from '../../components/car-form/car-form.component';

/**
 * Component responsible for editing an existing car.
 * It retrieves the car data based on the route parameter and provides a form for editing.
 */
@Component({
  selector: 'app-edit-car',
  standalone: true,
  imports: [CarFormComponent],
  templateUrl: './edit-car.component.html',
  styleUrl: './edit-car.component.css'
})
export class EditCarComponent implements OnInit{
  @Input() car!: Car // The car object to be edited.

  /**
   * Constructs the EditCarComponent and injects the necessary services.
   * 
   * @param {ActivatedRoute} route - Provides access to route parameters for fetching the car to be edited.
   * @param {CarService} carService - The service responsible for car-related operations.
   * @param {Location} location - Angular's Location service for navigating back in the browser history.
  */
  constructor(
    private route : ActivatedRoute,
    private carService: CarService,
    private location: Location
  ){}

  /**
   * Lifecycle hook that is called after the component is initialized.
   * It fetches the car data based on the 'id' route parameter.
   * 
   * @returns {void}
  */
  ngOnInit(): void {
    const carId = this.route.snapshot.paramMap.get('id');
    if (carId) {
      this.carService.getCar(carId).subscribe(data => {
        this.car = data
      })
    }
  }

  /**
   * Handles the car edit form submission.
   * Submits the updated car data to the CarService and navigates back on success.
   * 
   * @param {Car} car - The car object with updated values to be saved.
   * @returns {void}
  */
  handleCarEditForm(car: Car): void {
    this.carService.updateCar(car).subscribe({
      next:() => this.location.back(),
      error: (err) => console.error('error creating car', err)
    })
  }
}
