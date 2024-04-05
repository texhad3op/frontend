import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UrlService {
    public baseUrl: string = 'http://localhost:8080';
    public productUrl = `${this.baseUrl}/public/products`;
    public allPurchasesUrl = `${this.baseUrl}/public/purchases/simple`;
    public purchasesUrl = `${this.baseUrl}/public/purchases`;
}
