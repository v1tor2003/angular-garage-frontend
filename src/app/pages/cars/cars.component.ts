import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from '../../types';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CarService } from '../../services/car.service';
import { MatDialog } from '@angular/material/dialog';
import { CarDeleteModalComponent } from '../../components/car-delete-modal/car-delete-modal.component';
const componentSelector = 'app-cars'

@Component({
  selector: componentSelector,
  standalone: true,
  imports: [CarDeleteModalComponent, MatCardModule, MatButtonModule],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css'
})
export class CarsComponent implements AfterViewInit, OnDestroy, OnInit {
  cars: Car[] = []

  constructor(
    private carService: CarService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.create = this.create.bind(this)
  }
  ngOnInit(): void {
    this.carService.getCars().subscribe(data => {
      this.cars = data
    })
  }

  ngAfterViewInit() {
    // Listen for the custom 'add' event
    const element = document.querySelector(componentSelector)
    if (element) element.addEventListener('create', this.create)
  }
  
  ngOnDestroy() {
    const element = document.querySelector(componentSelector)
    if (element) element.removeEventListener('create', this.create)
  }

  create(): void {
    this.router.navigate(['/create'])
  }

  garageIsEmpty(): boolean {
    return this.cars.length === 0
  }

  editCar(car: Car): void {
    this.router.navigate(['/edit', car.id])
  }

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

  deleteCar(carId: number): void {
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
