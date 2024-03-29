import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';
import { PurchasesListComponent } from './purchases/purchase-list/purchases-list.component';
import { PurchaseLinesListComponent } from './purchases/purchase-lines/purchase-lines-list.component';


const routeConfig: Routes = [
  // {
  //   path: '',
  //   component: HomeComponent,
  //   title: 'Home page'
  // },
  {
    path: '',
    component: PurchasesListComponent,
    title: 'Purchases page'
  },
  {
    path: 'purchase/:id',
    component: PurchaseLinesListComponent,
    title: 'Home details'
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Home details'
  },
  {
    path: 'list',
    component: ListComponent,
    title: 'List'
  }, 
];

export default routeConfig;
