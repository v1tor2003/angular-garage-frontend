import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

/**
 * Component representing the landing page of the application.
 * Provides a button to navigate to the cars page.
 */
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  
  /**
   * Constructs the LandingPageComponent and injects the Router service.
   * 
   * @param {Router} router - Angular's Router service for navigation between routes.
  */
  constructor(public router: Router){}
  
  /**
   * Navigates the user to the `/cars` route when the 'Ver Carros!' button is clicked.
   * 
   * @returns {void}
  */
  getStarted(): void{
    this.router.navigate(['/cars'])
  }
}
