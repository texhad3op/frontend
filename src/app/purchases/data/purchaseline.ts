import { Product } from './product';
export class PurchaseLine {
    id: number;
    product: Product;

    constructor(id: number, product: Product) {
        this.id = id;
        this.product = product;
    }
}
