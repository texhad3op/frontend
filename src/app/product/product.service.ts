import { Injectable, inject } from '@angular/core';
import { Product } from '../purchases/data/product';
import { UrlService } from '../url.service';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    urlService = inject(UrlService);
    
    async getProducts(): Promise<Product[]> {
        const data = await fetch(this.urlService.productUrl);
        return await data.json() ?? [];
    }
}
