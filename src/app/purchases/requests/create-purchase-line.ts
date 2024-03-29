export class CreatePurchaseLineRequest{
    purchaseId: number;
    productId: number;

    constructor(purchaseId: number, productId: number){
        this.purchaseId = purchaseId;
        this.productId = productId;
    }

}
