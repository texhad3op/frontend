import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseService } from '../service/purchase.service';
import { ProductService } from '../../product/product.service';
import { Purchase } from '../data/purchase';
import { Product } from '../data/product';

import { ActivatedRoute } from '@angular/router';
import { PurchaseComponent } from '../purchase/purchase.component';
import { LocalStorageService } from '../../local-storage.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'purchase-lines-list-component',
  standalone: true,
  imports: [
    CommonModule,
    PurchaseComponent,
    ReactiveFormsModule
  ],
  template: `
  <article>
    <section class="results">
      <p *ngFor="let line of purchase?.lines" >
      {{line.id}} --- {{line.product.name}}</p>
    </section>

    <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="purchaseForm" (submit)="submitPurchaseForm()">
          <select formControlName="product">
            <option [ngValue]="null" disabled>Select Country</option>
            <option *ngFor="let product of products" [ngValue]="product.id">{{product.name}}</option>
          </select>
          <button type="submit" class="primary">Create</button>
        </form>
      </section>

  </article>
  `,
  styleUrls: ['./purchase-lines-list.component.css'],
})

export class PurchaseLinesListComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  purchaseService = inject(PurchaseService);
  productService = inject(ProductService);
  purchase: Purchase | undefined;
  products: Product[] = [];


  purchaseForm = new FormGroup({
    product: new FormControl('')
  });

  constructor() {
    const purchaseId = parseInt(this.route.snapshot.params['id']);
    this.reloadPurchases(purchaseId);
    this.loadProducts();
  }

  public submitPurchaseForm() {
    this.purchaseService.createPurchaseLine(this.purchase!.id, parseInt(this.purchaseForm.value.product ?? "-1"))
      .then(res => this.reloadPurchases(this.purchase!.id));
  }

  private reloadPurchases(id: number) {
    this.purchaseService.getPurchase(id).then(purchase => {
      this.purchase = purchase;
    });
  }

  private loadProducts(){
    this.productService.getProducts().then(products => {
      this.products = products;
    });
  }
}


