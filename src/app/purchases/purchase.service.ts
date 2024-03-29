import { Injectable } from '@angular/core';
import { Purchase } from './data/purchase';
import { Product } from './data/product';
import { CreatePurchaseLineRequest } from './requests/create-purchase-line';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class PurchaseService {

    url: string = 'http://localhost:8080/public/purchases/simple';
    url2: string = 'http://localhost:8080/public/purchases';
    url3: string = 'http://localhost:8080/public/products';


    constructor(private localStorageService: LocalStorageService) {

    }

    async getAllPurchases(): Promise<Purchase[]> {
        const data = await fetch(this.url);
        return await data.json() ?? [];
    }

    async getPurchase(id: number): Promise<Purchase | undefined> {
        const data = await fetch(`${this.url2}/${id}`);
        return await data.json() ?? {};
    }

    async createPurchaseLine(purchaseId: number, productId: number):Promise<number>{
        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set('Content-Type', 'application/json');
        const data = await fetch(this.url2,
        {
          method: 'POST',
          headers: requestHeaders,
          body: JSON.stringify(new CreatePurchaseLineRequest(purchaseId, productId))
        });
        return await data.status;
    }

    async getProducts(): Promise<Product[]> {
        const data = await fetch(this.url3);
        return await data.json() ?? [];
    }


}
