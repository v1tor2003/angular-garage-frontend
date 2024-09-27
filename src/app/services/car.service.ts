import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../types';

/**
 * Service to manage CRUD operations for Cars.
 * Provides methods to fetch, create, update, and delete car records from an API.
 */
@Injectable({
  providedIn: 'root'
})
export class CarService {
  // base url for the json-server, should be a env var
  private static apiUrl = 'http://localhost:5000/cars'; 
  // TO BE REMOVED: useless variable since json server auto-generates ids
  // To be removed in future refactor (documentation purposes only).
  public lastInsertedId: number | undefined

  /**
   * Constructs the CarService and initializes the last inserted car ID.
   * Fetches the list of cars and sets the `lastInsertedId` to the total count.
   * 
   * @param {HttpClient} httpClient - Angular HttpClient service for making HTTP requests.
  */
  constructor(private httpClient: HttpClient) { 
    this.getCars().subscribe(data => {
      this.lastInsertedId = data.length
    })
  }

  /**
   * Fetches the list of all cars from the API.
   * 
   * @returns {Observable<Car[]>} - Observable stream of car objects.
  */
  getCars(): Observable<Car[]> {
    return this.httpClient.get<Car[]>(CarService.apiUrl);
  }

  /**
   * Fetches a single car from the API based on its ID.
   * 
   * @param {string} id - The ID of the car to be retrieved.
   * @returns {Observable<Car>} - Observable stream of the car object.
   */
  getCar(id: string): Observable<Car> {
    return this.httpClient.get<Car>(`${CarService.apiUrl}/${id}`);
  }

  /**
   * Creates a new car and sends it to the API.
   * 
   * @param {Car} car - The car object to be created.
   * @returns {Observable<Car>} - Observable stream of the newly created car object.
  */
  createCar(car: Car): Observable<Car> {
    return this.httpClient.post<Car>(CarService.apiUrl, car);
  }

  /**
   * Updates an existing car in the API.
   * 
   * @param {Car} car - The car object with updated details.
   * @returns {Observable<Car>} - Observable stream of the updated car object.
  */
  updateCar(car: Car): Observable<Car> {
    return this.httpClient.put<Car>(`${CarService.apiUrl}/${car.id}`, car);
  }

  /**
   * Deletes a car from the API based on its ID.
   * 
   * @param {string} id - The ID of the car to be deleted.
   * @returns {Observable<Car>} - Observable stream of the deleted car object.
  */
  deleteCar(id: string): Observable<Car> {
    return this.httpClient.delete<Car>(`${CarService.apiUrl}/${id}`);
  }
}
