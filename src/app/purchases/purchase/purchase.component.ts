import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Purchase } from '../data/purchase';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'purchase-component',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  template: `
    <section class="listing">
      <h2 class="listing-heading">{{ purchase.id }}</h2>
      <p class="listing-heading">{{ purchase.date}}</p>
      <a [routerLink]="['/purchase', purchase.id]">Все покупки</a>
    </section>
  `,
  styleUrls: ['./purchase.component.css'],
})

export class PurchaseComponent {

  @Input() purchase!: Purchase;

}
