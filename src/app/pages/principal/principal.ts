import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Sidebar } from '../../components/sidebar/sidebar';

@Component({
  selector: 'app-principal',
  imports: [Sidebar],
  templateUrl: './principal.html',
  styleUrl: './principal.css',
})
export class Principal {
  private router = inject(Router);

  menuAbierto = signal(false);

  estadisticas = [
    { valor: '50', etiqueta: 'Usuarios activos', icono: '👤' },
    { valor: '5', etiqueta: 'Entrenadores activos', icono: '🏋️' },
    { valor: '$15,000', etiqueta: 'Ingresos del mes', icono: '📈' },
    { valor: '1', etiqueta: 'Membresías por vencer', icono: '📅' },
  ];

  afluencia = [
    { label: 'Invierno', valor: 60, color: '#4f80f7' },
    { label: 'Primavera', valor: 45, color: '#a98cf5' },
    { label: 'Verano', valor: 78, color: '#f3b76a' },
    { label: 'Otoño', valor: 30, color: '#ffdf5e' },
  ];

  eliminarEntrenador() {
    this.router.navigate(['/entrenadores']);
  }

  registrarCliente() {
    this.router.navigate(['/registro-usuario']);
  }
}