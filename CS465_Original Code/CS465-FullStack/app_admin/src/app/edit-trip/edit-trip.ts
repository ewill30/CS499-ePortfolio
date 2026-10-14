import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Trip } from '../models/trip.model';
import { TripData } from '../services/trip-data';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-trip.html',
  styleUrl: './edit-trip.css'
})
export class EditTrip implements OnInit {

  public trip: Trip = new Trip();
  private originalCode: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tripData: TripData,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    const tripCode = this.route.snapshot.paramMap.get('tripCode');

    if (tripCode) {

      this.originalCode = tripCode;

      this.tripData.getTrip(tripCode).subscribe({

        next: (trip: Trip) => {

          console.log('TRIP TO EDIT:', trip);

          // Convert MongoDB date format to HTML date input format
          // Example:
          // 2026-08-20T00:00:00.000Z
          // becomes:
          // 2026-08-20
          if (trip.start) {
            trip.start = trip.start.toString().split('T')[0];
          }

          this.trip = trip;

          // Force Angular to refresh the form
          this.cdr.detectChanges();
        },

        error: (error) => {
          console.error('Error loading trip:', error);
        }

      });
    }
  }

  public updateTrip(): void {

    this.tripData.updateTrip(this.trip).subscribe({

      next: () => {

        console.log('Trip updated successfully');

        this.router.navigate(['/']);
      },

      error: (error) => {

        console.error('Error updating trip:', error);

      }

    });
  }

  public deleteTrip(): void {

    if (confirm('Are you sure you want to delete this trip?')) {

      this.tripData.deleteTrip(this.originalCode).subscribe({

        next: () => {

          console.log('Trip deleted successfully');

          this.router.navigate(['/']);
        },

        error: (error) => {

          console.error('Error deleting trip:', error);

        }

      });
    }
  }
}