import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface AuthResponse {
  token: string;
}

interface UserCredentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class Authentication {
  private apiBaseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  public login(user: UserCredentials): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiBaseUrl}/login`, user)
      .pipe(
        tap((response: AuthResponse) => {
          this.saveToken(response.token);
        })
      );
  }

  public logout(): void {
    localStorage.removeItem('travlr-token');
  }

  public saveToken(token: string): void {
    localStorage.setItem('travlr-token', token);
  }

  public getToken(): string | null {
    return localStorage.getItem('travlr-token');
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }
}