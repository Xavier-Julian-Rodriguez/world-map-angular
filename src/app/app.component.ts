import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Map } from './map.component';
import { SharedService } from './shared.service';
import { ApiService } from './api.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Map],
  templateUrl: './app.component.html',
  providers: [ApiService, SharedService],
})
export class AppComponent implements OnInit {
  title = 'World Map';
  subTitle = 'Quick Facts';
  selectedCountry: string = '';
  countryData: any = {};

  private sharedService: SharedService;
  private apiService: ApiService;

  constructor(sharedService: SharedService, apiService: ApiService) {
    (this.sharedService = sharedService), (this.apiService = apiService);
  }
  ngOnInit() {
    this.sharedService.selectedCountry$.subscribe({
      next: (country) => {
        this.selectedCountry = country;
        this.getTheCountryData();
      },
    });
  }
  countrySelector(countryId: string) {
    this.selectedCountry = countryId;
    this.getTheCountryData();
  }

  getTheCountryData() {
    if (this.selectedCountry) {
      this.apiService.getCountryData(this.selectedCountry).subscribe({
        next: (data) => {
          console.log('Data fetched:', data);
          if (Array.isArray(data) && data.length > 1) {
            this.countryData = data[1][0];
            console.log('Country data:', this.countryData);
          }
        },
      });
    }
  }
}
