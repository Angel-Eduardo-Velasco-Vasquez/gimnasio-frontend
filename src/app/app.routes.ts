import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Principal } from './pages/principal/principal';
import { Restablecer } from './pages/restablecer/restablecer';
import { Entrenadores } from './pages/entrenadores/entrenadores';
import { AgregarEntrenador } from './pages/agregar-entrenador/agregar-entrenador';
import { Clientes } from './pages/clientes/clientes';
import { RegistroUsuario } from './pages/registro-usuario/registro-usuario';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'principal', component: Principal },
  { path: 'restablecer', component: Restablecer },
  { path: 'entrenadores', component: Entrenadores },
  { path: 'entrenadores/nuevo', component: AgregarEntrenador },
  { path: 'registro-entrenador', component: AgregarEntrenador },
  { path: 'clientes', component: Clientes },
  { path: 'registro-usuario', component: RegistroUsuario },
  { path: '**', redirectTo: 'login' },
];