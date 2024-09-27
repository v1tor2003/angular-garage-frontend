import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Car } from '../../types';
import { MatButtonModule } from '@angular/material/button';

/**
 * Component representing a modal dialog for confirming the deletion of a car.
 * 
 * @template {Car} The type of car being deleted.
*/
@Component({
  selector: 'app-car-delete-modal',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './car-delete-modal.component.html',
  styleUrl: './car-delete-modal.component.css'
})
export class CarDeleteModalComponent {

  /**
   * Constructs the CarDeleteModalComponent.
   * 
   * @param {MatDialogRef<CarDeleteModalComponent>} dialogRef - Reference to the dialog for closing it.
   * @param {Object} data - Data injected into the modal dialog.
   * @param {Car} data.car - The car object being deleted.
   */
  constructor(
    public dialogRef: MatDialogRef<CarDeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {car: Car}
  ){}

  /**
   * Confirms the deletion of the car and closes the dialog with a positive result.
   * 
   * @returns {void}
  */
  onConfirm(): void {
    this.dialogRef.close(true)
  }
  
  /**
   * Cancels the deletion and closes the dialog with a negative result.
   * 
   * @returns {void}
  */
  onCancel(): void {
    this.dialogRef.close(false)
  }
}
