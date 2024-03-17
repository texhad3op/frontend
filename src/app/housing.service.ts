import { Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';
import { Resp } from './resp';
import { User } from './user';
import { LoginRequest } from './login-request';
import { LocalStorageService } from './local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class HousingService {

  url = 'http://localhost:3000/locations';
  url2 = 'http://localhost:8080/public/users';

  constructor(private localStorageService: LocalStorageService) {

  }


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

  async getUsers(): Promise<User[]> {
    const data = await fetch(this.url2);
    return await data.json() ?? [];
  }

  async getUsersPrivate(): Promise<User[]> {
    const token = this.localStorageService.getItem('token');
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Authorization', 'Basic '+token);

    const data = await fetch('http://localhost:8080/private/users',
    {
      method: 'GET',
      headers: requestHeaders
    });
    return await data.json() ?? [];
  }

  async login(): Promise<string>{


    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Content-Type', 'application/json');

    const data = await fetch('http://localhost:8080/public/authorize',
    {
      method: 'POST',
      //mode: 'cors',
      headers: requestHeaders,
      body: JSON.stringify(new LoginRequest("admin", "admin"))
    });


    return await data.text() ?? "error";
  }

}
