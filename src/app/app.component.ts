import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { CarsComponent } from './pages/cars/cars.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { filter } from 'rxjs/operators';

/**
 * Main application component for the Angular Garage project.
 * Manages routing and display of a create button based on the current route.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    LandingPageComponent, 
    MatListModule, 
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'Angular Garage'; // app title
  showCreateButton: boolean = false // flag to hide the Create btn based on the current route
  
  /**
   * Constructs the AppComponent and sets up the route event subscription.
   * The subscription checks if the current route is '/cars' and updates
   * `showCreateButton` accordingly.
   * 
   * @param {Router} router - Angular Router service to track navigation events.
   */
  constructor(public router: Router){
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(
      (event: NavigationEnd) => this.showCreateButton = event.url === '/cars'
    )
  }

  /**
   * Determines if the "Create" button should be visible based on the current route.
   * The button is only shown when the current route is '/cars'.
   * 
   * @returns {boolean} - True if the current route is '/cars', otherwise false.
   */
  canCreate(): boolean{
    return this.router.url === '/cars'
  }

   /**
   * Dispatches a custom 'create' event to the CarsComponent.
   * This method triggers when the "Create" button is clicked.
   * It finds the 'app-cars' component in the DOM and dispatches
   * the 'create' event to it.
   * 
   * @returns {void} - Procedure, no return
   */
  handleCreateEvent(): void {
    const carsComponentElement = document.querySelector('app-cars')
    if(carsComponentElement){
      const customEvent = new CustomEvent('create')
      carsComponentElement.dispatchEvent(customEvent)
    }
  }
}
