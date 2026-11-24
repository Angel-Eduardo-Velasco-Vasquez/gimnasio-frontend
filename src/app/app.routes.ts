import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Principal } from './pages/principal/principal';
import { Restablecer } from './pages/restablecer/restablecer';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'principal', component: Principal },
  { path: 'restablecer', component: Restablecer },
  { path: '**', redirectTo: 'login' },
];