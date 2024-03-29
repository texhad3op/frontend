import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseService } from './purchase.service';
import { Purchase } from './data/purchase';
import { Product } from './data/product';

import { ActivatedRoute } from '@angular/router';
import { PurchaseComponent } from './purchase.component';
import { LocalStorageService } from '../local-storage.service';
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
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="id">ID</label>
          <input id="id" type="text" formControlName="id">

          <select formControlName="product2">
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
  purchase: Purchase | undefined;
  products: Product[] = [];


  applyForm = new FormGroup({
    id: new FormControl(''),
    product2: new FormControl('')
  });

  constructor() {
    const purchaseId = parseInt(this.route.snapshot.params['id'], 10);
    this.purchaseService.getPurchase(purchaseId).then(purchase => {
      this.purchase = purchase;
    });

    this.purchaseService.getProducts().then(products => {
      this.products = products;
      console.log(products);
    });


  }


  submitApplication() {
    this.purchaseService.createPurchaseLine(this.purchase!.id, parseInt(this.applyForm.value.product2 ?? "-1", 10))
      .then(res => {

        this.purchaseService.getPurchase(this.purchase!.id).then(purchase => {
          this.purchase = purchase;
          console.log(purchase);
        });

      });
  }

}


