import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api';

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mi-perfil.html',
  styleUrl: './mi-perfil.css'
})
export class MiPerfil implements OnInit {
  nombreCompleto: string = '';
  especialidad: string = '';
  telefono: string = '';
  estado: string = 'Activo';

  clasesImpartidas: number = 0;
  evaluacionesRealizadas: number = 0;

  mostrarConfirmacion: boolean = false;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.api.getPerfil().subscribe({
      next: (perfil) => {
        this.nombreCompleto = perfil.nombre;
        this.especialidad = perfil.especialidad;
        this.telefono = perfil.telefono;
        this.estado = perfil.estado ? 'Activo' : 'Inactivo';
        this.clasesImpartidas = perfil.clasesImpartidas;
        this.evaluacionesRealizadas = perfil.evaluacionesRealizadas;
      },
      error: (err) => {
        if (err.status === 401) this.router.navigate(['/login']);
      }
    });
  }

  get inicial(): string {
    return this.nombreCompleto.trim().charAt(0).toUpperCase() || 'E';
  }

  guardarCambios(): void {
    const soloDigitosTelefono = this.telefono.replace(/\D/g, '');

    this.api
      .actualizarPerfil({
        nombre: this.nombreCompleto.trim(),
        especialidad: this.especialidad.trim(),
        telefono: soloDigitosTelefono
      })
      .subscribe({
        next: (actualizado) => {
          this.nombreCompleto = actualizado.nombre;
          this.especialidad = actualizado.especialidad;
          this.telefono = actualizado.telefono;
          this.mostrarConfirmacion = true;
        },
        error: (err) => alert(err.error?.error || 'Error al guardar los cambios del perfil.')
      });
  }

  cerrarConfirmacion(): void {
    this.mostrarConfirmacion = false;
  }
}