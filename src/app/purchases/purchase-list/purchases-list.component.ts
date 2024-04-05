import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseService } from '../service/purchase.service';
import { Purchase } from '../data/purchase';

import { PurchaseComponent } from '../purchase/purchase.component';
import { LocalStorageService } from '../../local-storage.service';

@Component({
  selector: 'purchases-list-component',
  standalone: true,
  imports: [
    CommonModule,
    PurchaseComponent
  ],
  template: `
    <section class="results">
      <purchase-component *ngFor="let purchase of purchases" [purchase]="purchase">
      </purchase-component>
    </section>
  `,
  styleUrls: ['./purchases-list.component.css'],
})

export class PurchasesListComponent {
  purchases: Purchase[] = []
  purchaseService: PurchaseService = inject(PurchaseService);

  constructor(private localStorageService: LocalStorageService) {
    this.purchaseService.getAllPurchases().then((purchasesList: Purchase[]) => {
      this.purchases = purchasesList;
    });
  }
}
