import { Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';
import { Resp } from './resp';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  url = 'http://localhost:3000/locations';
  url2 = 'http://localhost:8081/resp1';

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(firstName, lastName, email);
  }

  async getResp(): Promise<Resp> {
    const data = await fetch(this.url2);
    return await data.json() ?? {};
  }
}
