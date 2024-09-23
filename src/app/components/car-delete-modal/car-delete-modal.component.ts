import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Car } from '../../types';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-car-delete-modal',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './car-delete-modal.component.html',
  styleUrl: './car-delete-modal.component.css'
})
export class CarDeleteModalComponent {
  constructor(
    public dialogRef: MatDialogRef<CarDeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {car: Car}
  ){}

  onConfirm(): void {
    this.dialogRef.close(true)
  }

  onCancel(): void {
    this.dialogRef.close(false)
  }
}
