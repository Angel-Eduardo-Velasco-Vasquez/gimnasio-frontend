import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Principal } from './pages/principal/principal';
import { Restablecer } from './pages/restablecer/restablecer';
import { Entrenadores } from './pages/entrenadores/entrenadores';
import { AgregarEntrenador } from './pages/agregar-entrenador/agregar-entrenador';
import { Clientes } from './pages/clientes/clientes';
import { RegistroUsuario } from './pages/registro-usuario/registro-usuario';
import { Layout } from './features/entrenador/layout/layout';
import { ClasesDia } from './features/entrenador/clases-dia/clases-dia';
import { PaseLista } from './features/entrenador/pase-lista/pase-lista';
import { MisAlumnos } from './features/entrenador/mis-alumnos/mis-alumnos';
import { MiPerfil } from './features/entrenador/mi-perfil/mi-perfil';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'restablecer', component: Restablecer },

  // Vistas del módulo Administrador
  { path: 'admin', redirectTo: 'principal', pathMatch: 'full' },
  { path: 'principal', component: Principal },
  { path: 'entrenadores', component: Entrenadores },
  { path: 'entrenadores/nuevo', component: AgregarEntrenador },
  { path: 'registro-entrenador', component: AgregarEntrenador },
  { path: 'clientes', component: Clientes },
  { path: 'registro-usuario', component: RegistroUsuario },

  // Vistas del módulo Entrenador
  {
    path: 'entrenador',
    component: Layout,
    children: [
      { path: '', redirectTo: 'clases-dia', pathMatch: 'full' },
      { path: 'clases-dia', component: ClasesDia },
      { path: 'pase-lista/:idHorario/:idSesion', component: PaseLista },
      { path: 'mis-alumnos', component: MisAlumnos },
      { path: 'mi-perfil', component: MiPerfil }
    ]
  },

  { path: '**', redirectTo: 'login' }
];