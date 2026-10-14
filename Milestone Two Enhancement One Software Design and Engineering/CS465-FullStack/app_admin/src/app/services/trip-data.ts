import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip.model';
import { Authentication } from './authentication';

@Injectable({
  providedIn: 'root'
})
export class TripData {
  private apiBaseUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    private authenticationService: Authentication
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authenticationService.getToken();

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.apiBaseUrl}/trips`);
  }

  getTrip(tripCode: string): Observable<Trip> {
    return this.http.get<Trip>(
      `${this.apiBaseUrl}/trips/${tripCode}`
    );
  }

  addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(
      `${this.apiBaseUrl}/trips`,
      trip,
      {
        headers: this.getAuthHeaders()
      }
    );
  }

  updateTrip(trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(
      `${this.apiBaseUrl}/trips/${trip.code}`,
      trip,
      {
        headers: this.getAuthHeaders()
      }
    );
  }

  deleteTrip(tripCode: string): Observable<void> {
    return this.http.delete<void>(
      `${this.apiBaseUrl}/trips/${tripCode}`,
      {
        headers: this.getAuthHeaders()
      }
    );
  }
}