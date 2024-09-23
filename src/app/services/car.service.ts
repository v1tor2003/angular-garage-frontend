import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../types';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private static apiUrl = 'http://localhost:5000/cars';
  public lastInsertedId: number | undefined

  constructor(private httpClient: HttpClient) { 
    this.getCars().subscribe(data => {
      this.lastInsertedId = data.length
    })
  }

  getCars(): Observable<Car[]> {
    return this.httpClient.get<Car[]>(CarService.apiUrl);
  }

  getCar(id: string): Observable<Car> {
    return this.httpClient.get<Car>(`${CarService.apiUrl}/${id}`);
  }

  createCar(car: Car): Observable<Car> {
    return this.httpClient.post<Car>(CarService.apiUrl, car);
  }

  updateCar(car: Car): Observable<Car> {
    return this.httpClient.put<Car>(`${CarService.apiUrl}/${car.id}`, car);
  }

  deleteCar(id: string): Observable<Car> {
    return this.httpClient.delete<Car>(`${CarService.apiUrl}/${id}`);
  }
}
