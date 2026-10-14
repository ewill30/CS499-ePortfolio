import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Trip } from '../models/trip.model';
import { TripCard } from '../trip-card/trip-card';
import { TripData } from '../services/trip-data';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TripCard, RouterLink],
  templateUrl: './trip-list.html',
  styleUrl: './trip-list.css'
})
export class TripList implements OnInit {

  // Stores the original trip data received from the API
  trips: Trip[] = [];

  // Stores the trips that will be displayed after searching,
  // filtering, and sorting
  filteredTrips: Trip[] = [];

  // Values used by the search, price filter, and sort controls
  searchTerm: string = '';
  sortOption: string = 'name';
  maxPrice: number | null = null;

  constructor(
    private tripData: TripData,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    // Retrieve all available trips from the API
    this.tripData.getTrips().subscribe({
      next: (trips: Trip[]) => {
        console.log('TRIPS FROM API:', trips);

        // Save the original trip data and prepare the display results
        this.trips = trips;
        this.applyFilters();

        // Force Angular to update the page after receiving the data
        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Error loading trips:', error);
      }
    });
  }

  // Applies the search, price filter, and selected sorting method
  applyFilters(): void {

    // Create a copy of the array so the original data is not modified
    let results = [...this.trips];

    // Search trips by name, trip code, or resort
    if (this.searchTerm.trim()) {
      const search = this.searchTerm.toLowerCase();

      results = results.filter(trip =>
        trip.name.toLowerCase().includes(search) ||
        trip.code.toLowerCase().includes(search) ||
        trip.resort.toLowerCase().includes(search)
      );
    }

    // Remove trips that are above the selected maximum price
    if (this.maxPrice !== null && this.maxPrice > 0) {
      results = results.filter(
        trip => trip.perPerson <= this.maxPrice!
      );
    }

    // Sort the remaining trips based on the administrator's selection
    switch (this.sortOption) {

      // Sort trip prices from lowest to highest
      case 'priceLow':
        results.sort((a, b) =>
          a.perPerson - b.perPerson
        );
        break;

      // Sort trip prices from highest to lowest
      case 'priceHigh':
        results.sort((a, b) =>
          b.perPerson - a.perPerson
        );
        break;

      // Sort trips by the earliest starting date
      case 'date':
        results.sort((a, b) =>
          new Date(a.start).getTime() -
          new Date(b.start).getTime()
        );
        break;

      // Default sorting is alphabetical by trip name
      default:
        results.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
    }

    // Update the array being displayed on the page
    this.filteredTrips = results;

    this.cdr.detectChanges();
  }

  // Clear all search and filter options and show all trips again
  resetFilters(): void {
    this.searchTerm = '';
    this.sortOption = 'name';
    this.maxPrice = null;

    this.applyFilters();
  }
}