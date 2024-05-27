import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private selectedCountrySource = new BehaviorSubject<string>('');
  selectedCountry$ = this.selectedCountrySource.asObservable();

  setSelectedCountry(countryName: string) {
    this.selectedCountrySource.next(countryName);
  }
  setSelectedCountryId(countryId: string) {
    this.selectedCountrySource.next(countryId);
  }
}
