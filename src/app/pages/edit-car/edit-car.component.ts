import { Component, Input, OnInit } from '@angular/core';
import { Car } from '../../types';
import { CarService } from '../../services/car.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CarFormComponent } from '../../components/car-form/car-form.component';

@Component({
  selector: 'app-edit-car',
  standalone: true,
  imports: [CarFormComponent],
  templateUrl: './edit-car.component.html',
  styleUrl: './edit-car.component.css'
})
export class EditCarComponent implements OnInit{
  @Input() car!: Car
  constructor(
    private route : ActivatedRoute,
    private carService: CarService,
    private location: Location
  ){}

  ngOnInit(): void {
    const carId = this.route.snapshot.paramMap.get('id');
    if (carId) {
      this.carService.getCar(carId).subscribe(data => {
        this.car = data
      })
    }
  }

  handleCarEditForm(car: Car): void {
    this.carService.updateCar(car).subscribe({
      next:() => this.location.back(),
      error: (err) => console.error('error creating car', err)
    })
  }
}
