import { Component } from '@angular/core';

/**
 * Component representing the footer of the application.
 * Displays the current year dynamically.
*/
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})

export class FooterComponent {
  currentYear: number = new Date().getFullYear() // The current year to be displayed in the footer.
}
