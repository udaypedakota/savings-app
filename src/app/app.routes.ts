import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { ChitList } from './chit-list/chit-list';
import { AddChit } from './add-chit/add-chit';
import { Payment } from './payment/payment';
import { Reports } from './reports/reports';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'chits', component: ChitList },
  { path: 'chits/add', component: AddChit },
  { path: 'chits/edit/:id', component: AddChit },
  { path: 'payments', component: Payment },
  { path: 'reports', component: Reports },
];
