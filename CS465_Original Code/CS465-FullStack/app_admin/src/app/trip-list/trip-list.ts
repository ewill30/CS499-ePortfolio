import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Trip } from '../models/trip.model';
import { TripCard } from '../trip-card/trip-card';
import { TripData } from '../services/trip-data';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CommonModule, TripCard, RouterLink],
  templateUrl: './trip-list.html',
  styleUrl: './trip-list.css'
})
export class TripList implements OnInit {

  trips: Trip[] = [];

  constructor(
    private tripData: TripData,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.tripData.getTrips().subscribe({
      next: (trips: Trip[]) => {
        console.log('TRIPS FROM API:', trips);

        this.trips = trips;

        // Force Angular to update the page
        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Error loading trips:', error);
      }
    });
  }
}