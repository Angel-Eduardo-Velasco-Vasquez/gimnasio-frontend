import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mi-perfil.html',
  styleUrl: './mi-perfil.css'
})
export class MiPerfil {
  nombreCompleto: string = 'Carlos Beltrán';
  especialidad: string = 'CrossFit / Entrenamiento Funcional';
  telefono: string = '+52 951 123 4567';
  estado: string = 'Activo';

  clasesImpartidas: number = 124;
  evaluacionesRealizadas: number = 48;

  mostrarConfirmacion: boolean = false;

  get inicial(): string {
    return this.nombreCompleto.trim().charAt(0).toUpperCase() || 'C';
  }

  guardarCambios(): void {
    if (this.nombreCompleto.trim()) {
      this.mostrarConfirmacion = true;
    }
  }

  cerrarConfirmacion(): void {
    this.mostrarConfirmacion = false;
  }
}