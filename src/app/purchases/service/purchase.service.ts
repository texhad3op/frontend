import { Injectable, inject } from '@angular/core';
import { Purchase } from '../data/purchase';
import { Product } from '../data/product';
import { CreatePurchaseLineRequest } from '../request/create-purchase-line';
import { LocalStorageService } from '../../local-storage.service';
import { UrlService } from '../../url.service';

@Injectable({
    providedIn: 'root'
})
export class PurchaseService {

    urlService = inject(UrlService);

    async getAllPurchases(): Promise<Purchase[]> {
        const data = await fetch(this.urlService.allPurchasesUrl);
        return await data.json() ?? [];
    }

    async getPurchase(id: number): Promise<Purchase | undefined> {
        const data = await fetch(`${this.urlService.purchasesUrl}/${id}`);
        return await data.json() ?? {};
    }

    async createPurchaseLine(purchaseId: number, productId: number):Promise<number>{
        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set('Content-Type', 'application/json');
        const data = await fetch(this.urlService.purchasesUrl,
        {
          method: 'POST',
          headers: requestHeaders,
          body: JSON.stringify(new CreatePurchaseLineRequest(purchaseId, productId))
        });
        return data.status;
    }

}
