import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

/**
 * Component representing the header of the application.
 * Includes an optional button that emits an event when clicked.
*/
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() showButton!: boolean // flag to hide the 'Criar' button in not allowed routes.
  @Output() createEvent = new EventEmitter<void>() // Event emitted when the button 'Criar' is clicked.
   
  /**
   * Handles the click event for the button.
   * Emits the `createEvent` to notify the parent component.
   * 
   * @returns {void}
  */
  onCreateClick(): void {
    this.createEvent.emit()
  }
}
