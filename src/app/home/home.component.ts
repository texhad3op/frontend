import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';
import { Resp } from '../resp';
import { LocalStorageService } from '../local-storage.service';
import { User } from '../user';
import { Observable, interval, Subscription } from 'rxjs';

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
        <button class="primary" type="button" (click)="getUsers()">getUsers</button>
      </form>
    </section>
    <section>
      <form>
        <button class="primary" type="button" (click)="getUsersPrivate()">getUsersPrivate</button>
      </form>
    </section>

    <section>
      <form>
        <button class="primary" type="button" (click)="login('admin','admin')">login admin</button>
      </form>
    </section>

    <section>
      <form>
        <button class="primary" type="button" (click)="login('jura','jura')">login jura</button>
      </form>
    </section>

    <section>
      <form>
        <button class="primary" type="button" (click)="login('third','third')">login third</button>
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
    <section>
      <form>
        <button class="primary" type="button" (click)="uns()">unsubscribe</button>
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

  mySubscription: Subscription;

  constructor(private localStorageService: LocalStorageService) {
    let a: number = 54;
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });


    this.mySubscription = interval(1000).subscribe(x => {
      console.log("called");
    });

  }

  uns() {
    this.mySubscription.unsubscribe();
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

  getUsers() {
    console.log("clicked!!!")
    this.housingService.getUsers()
      .then((users: User[]) => {
        console.log(users)
      })
  }

  getUsersPrivate() {
    console.log("clicked!!!")
    this.housingService.getUsersPrivate()
      .then((users: User[]) => {
        console.log(users)
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

  login(login: string, password: string){
    this.housingService.login(login, password)
    .then((basicAuthToken: string) => {
      console.log(basicAuthToken)
      this.localStorageService.setItem('token', basicAuthToken);
    })
  }


}
