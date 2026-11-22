import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { DashboardAdmin } from './features/admin/dashboard-admin/dashboard-admin';
import { Layout } from './features/entrenador/layout/layout';
import { ClasesDia } from './features/entrenador/clases-dia/clases-dia';
import { PaseLista } from './features/entrenador/pase-lista/pase-lista';
import { MisAlumnos } from './features/entrenador/mis-alumnos/mis-alumnos';
import { MiPerfil } from './features/entrenador/mi-perfil/mi-perfil';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'admin', component: DashboardAdmin },
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