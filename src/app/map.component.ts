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

  constructor(
    private sharedService: SharedService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.addEventListenersToPaths();
    }
  }

  addEventListenersToPaths() {
    const paths = document.querySelectorAll('path');
    paths.forEach((element) => {
      element.addEventListener('click', this.onPathClick.bind(this));
    });
  }

  onPathClick(event: Event) {
    const element = event.currentTarget as SVGElement;
    const nameValue = element.getAttribute('name');
    const countryId = element.getAttribute('id');

    if (nameValue !== null && countryId !== null) {
      this.countryName = nameValue;
      this.countryId = countryId;
      this.selectedCountry.emit(nameValue);
      this.selectedCountryId.emit(countryId);
      this.sharedService.setSelectedCountry(this.countryName);
      this.sharedService.setSelectedCountryId(this.countryId);
      console.log(`Country Name: ${nameValue}, Country ID: ${countryId}`);
    }
  }
}
