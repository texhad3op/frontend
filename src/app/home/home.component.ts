import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';
import { Resp } from '../resp';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HousingLocationComponent
  ],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section>
      <form>
        <button class="primary" type="button" (click)="makeReq()">Request</button>
      </form>
    </section>
    <section>
      <form>
        <button class="primary" type="button" (click)="saveToStorage()">save</button>
      </form>
    </section>
    <section>
      <form>
        <button class="primary" type="button" (click)="loadFromStorage()">load</button>
      </form>
    </section>
    
    
    <section class="results">
      <app-housing-location
        *ngFor="let housingLocation2 of filteredLocationList" [housingLocation]="housingLocation2">
      </app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})

export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];

  housingService: HousingService = inject(HousingService);

  constructor(private localStorageService: LocalStorageService) {
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }

  makeReq() {
    console.log("clicked!!!")
    this.housingService.getResp()
    .then((resp: Resp) => {
      console.log(resp)
    })
  }

  saveToStorage() {
    console.log("clicked!!!")
    this.localStorageService.setItem('myKey', 'Hello, Local Storage!');
  }

  loadFromStorage() {
    console.log("clicked!!!")
    const value = this.localStorageService.getItem('myKey');
    console.log(value);
  }

  

}
