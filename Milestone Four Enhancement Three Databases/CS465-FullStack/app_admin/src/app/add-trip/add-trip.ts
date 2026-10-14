import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Trip } from '../models/trip.model';
import { TripData } from '../services/trip-data';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-trip.html',
  styleUrl: './add-trip.css'
})
export class AddTrip {

  public newTrip: Trip = new Trip();
  public errorMessage: string = '';

  constructor(
    private tripData: TripData,
    private router: Router
  ) {}
public addTrip(): void {
  this.errorMessage = '';

  this.tripData.addTrip(this.newTrip).subscribe({
    next: () => {
      console.log('Trip added successfully');
      this.router.navigate(['/']);
    },
    error: (error) => {
      console.error('Error adding trip:', error);
      this.errorMessage =
        error?.error?.message ||
        'Unable to add trip. Please check the information and try again.';
    }
  });
}
  }