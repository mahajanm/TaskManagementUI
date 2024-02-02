import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrl = 'https://localhost:7209/api';

  private tokenKey = 'authToken';

  private isLoggedIn = false;

  private credentials = { username: "test@gmail.com", password: "dummyPwd" };

  constructor(private http: HttpClient) {
   }

   public initializeApp(): Observable<any> {
    return this.login().pipe(
      tap(response => this.setAuthToken(response.token)),
      catchError(error => {
        console.error('Initialization login failed', error);
        return of(error);
      })
    );
  }

  login(): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, this.credentials);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  setAuthToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getAuthToken(): string {
    return localStorage.getItem(this.tokenKey)!;
  }

  isAuthenticated(): boolean {
    const token = this.getAuthToken();
    return !!token; // Check if token exists
  }

}
