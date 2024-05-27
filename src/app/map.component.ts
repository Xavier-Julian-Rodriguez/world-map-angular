import {
  Component,
  AfterViewInit,
  Output,
  EventEmitter,
  Input,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: `./svg.component.svg`,
  styleUrls: [`../styles.css`],
})
export class Map implements AfterViewInit {
  @Input() countryData: any;
  @Output() selectedCountry = new EventEmitter<string>();
  @Output() selectedCountryId = new EventEmitter<string>();

  countryId!: string;
  countryName!: string;
  countryCapital!: string;
  countryregion!: string;
  incomeLevel!: string;
  population!: number;
  longitude!: number;
  latitude!: number;

  constructor(
    private sharedService: SharedService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.getInfo();
    }
  }

  async getInfo() {
    if (isPlatformBrowser(this.platformId)) {
      document.querySelectorAll('path').forEach(async (element) => {
        element.addEventListener('mouseover', async (event) => {
          const nameValue = element.getAttribute('name');
          const countryId = element.getAttribute('id');
          if (nameValue !== null && countryId !== null) {
            this.countryName = nameValue;
            this.sharedService.setSelectedCountry(this.countryName);
            console.log(nameValue);
            this.countryId = countryId;
            this.selectedCountry.emit(nameValue);
            this.sharedService.setSelectedCountryId(this.countryId);
            console.log(countryId);
          }
        });
      });
    }
  }
}
