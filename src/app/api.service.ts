import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = `https://api.worldbank.org/v2/country`;

  constructor(private http: HttpClient) {}

  getCountryData(countryId: string): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/${countryId}?format=json`)
      .pipe(catchError(this.handleError<any>('getData', [])));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
