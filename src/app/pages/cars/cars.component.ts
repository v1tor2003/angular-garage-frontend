import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from '../../types';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CarService } from '../../services/car.service';
import { MatDialog } from '@angular/material/dialog';
import { CarDeleteModalComponent } from '../../components/car-delete-modal/car-delete-modal.component';

const componentSelector = 'app-cars' // dom name of tag

/**
 * Component that manages the display, creation, editing, and deletion of cars.
 * Implements lifecycle hooks for initialization, cleanup, and after view logic.
 */
@Component({
  selector: componentSelector,
  standalone: true,
  imports: [CarDeleteModalComponent, MatCardModule, MatButtonModule],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css'
})
export class CarsComponent implements AfterViewInit, OnDestroy, OnInit {
  cars: Car[] = [] // data to be displayed

  /**
   * Constructs the CarsComponent and binds the create method to the component.
   * 
   * @param {CarService} carService - The service for fetching and managing cars.
   * @param {Router} router - Angular Router for navigation.
   * @param {MatDialog} dialog - Angular Material Dialog service for opening modals.
  */
  constructor(
    private carService: CarService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.create = this.create.bind(this)
  }

   /**
   * Angular lifecycle hook that runs after the component has initialized.
   * Fetches the list of cars from the CarService.
   */
  ngOnInit(): void {
    this.carService.getCars().subscribe(data => {
      this.cars = data
    })
  }

  /**
   * Angular lifecycle hook that runs after the view has been initialized.
   * Listens for a custom 'create' event on the component's element to trigger car creation.
  */
  ngAfterViewInit() {
    // Listen for the custom 'add' event
    const element = document.querySelector(componentSelector)
    if (element) element.addEventListener('create', this.create)
  }
  
   /**
   * Angular lifecycle hook that runs just before the component is destroyed.
   * Cleans up the 'create' event listener from the component's element.
   */
  ngOnDestroy() {
    const element = document.querySelector(componentSelector)
    if (element) element.removeEventListener('create', this.create)
  }

   /**
   * Navigates the user to the car creation page when the "Criar" button is clicked, which triggers the 'create' event.
   * 
   * @returns {void}
   */
  create(): void {
    this.router.navigate(['/create'])
  }

  /**
   * Checks if the garage is empty (i.e., if there are no cars available or if a error ocurred).
   * 
   * @returns {boolean} - True if no cars are in the garage, false otherwise.
  */
  garageIsEmpty(): boolean {
    return this.cars.length === 0
  }

  /**
   * Navigates the user to the car edit page for the selected car.
   * 
   * @param {Car} car - The car to be edited.
   * @returns {void}
  */
  editCar(car: Car): void {
    this.router.navigate(['/edit', car.id])
  }

  /**
   * Opens a dialog to confirm car deletion.
   * If the dialog result is confirmed, deletes the car.
   * Note: the method argument type should be changed to car, it was any while in dev (documentation purposes only).
   * @param {Car} car - The car to be deleted.
  */
  openDeleteDialog(car: any): void {
    const dialogRef = this.dialog.open(CarDeleteModalComponent, {
      data: { car },
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCar(car.id)
      }
    })
  }

  /**
   * Deletes a car by its ID and removes it from the `cars` array.
   * 
   * @param {string} carId - The ID of the car to be deleted.
   * @returns {void}
   */
  deleteCar(carId: string): void {
    this.carService.deleteCar(carId).subscribe({
      next: () => {
        this.cars = this.cars.filter(car => car.id !== carId)
      },
      error: (err) => {
        console.error('Error deleting car:', err)  
      }
    })
  }
}
