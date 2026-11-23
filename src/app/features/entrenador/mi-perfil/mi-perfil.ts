import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  avisoNombre: string = '';
  avisoEspecialidad: string = '';
  avisoTelefono: string = '';

  clasesImpartidas: number = 0;
  evaluacionesRealizadas: number = 0;

  mostrarConfirmacion: boolean = false;
  mensajeError: string = '';

  constructor(
    private api: ApiService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.api.getPerfil().subscribe({
      next: (perfil) => {
        this.nombreCompleto = perfil.nombre;
        this.especialidad = perfil.especialidad;
        this.telefono = perfil.telefono;
        this.estado = perfil.estado ? 'Activo' : 'Inactivo';
        this.clasesImpartidas = perfil.clasesImpartidas;
        this.evaluacionesRealizadas = perfil.evaluacionesRealizadas;
        this.cdr.detectChanges();
      },
      error: (err) => {
        if (err.status === 401) this.router.navigate(['/login']);
      }
    });
  }

  get inicial(): string {
    return this.nombreCompleto.trim().charAt(0).toUpperCase() || 'E';
  }

 filtrarSoloLetras(campo: 'nombreCompleto' | 'especialidad'): void {
    const original = this[campo];
    const limpio = original.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, '');
    this[campo] = limpio;

    const mensaje = original !== limpio ? 'Solo se permiten letras y espacios.' : '';
    if (campo === 'nombreCompleto') this.avisoNombre = mensaje;
    if (campo === 'especialidad') this.avisoEspecialidad = mensaje;
  }

  filtrarSoloNumeros(): void {
    const original = this.telefono;
    const limpio = original.replace(/\D/g, '').slice(0, 10);
    this.telefono = limpio;

    if (/\D/.test(original)) {
      this.avisoTelefono = 'Solo se permiten números (10 dígitos).';
    } else if (limpio.length > 0 && limpio.length < 10) {
      this.avisoTelefono = `Faltan ${10 - limpio.length} dígitos para completar los 10.`;
    } else {
      this.avisoTelefono = '';
    }
  }

  get formularioValido(): boolean {
    const nombreOk = this.nombreCompleto.trim().length >= 3;
    const espOk = this.especialidad.trim().length >= 3;
    const telOk = /^\d{10}$/.test(this.telefono);
    return nombreOk && espOk && telOk;
  }

  guardarCambios(): void {
    this.mensajeError = '';
    if (!this.formularioValido) {
      this.mensajeError = 'Verifica que el nombre y especialidad tengan al menos 3 letras y el teléfono tenga 10 dígitos.';
      return;
    }

    this.api
      .actualizarPerfil({
        nombre: this.nombreCompleto.trim(),
        especialidad: this.especialidad.trim(),
        telefono: this.telefono
      })
      .subscribe({
        next: (actualizado) => {
          this.nombreCompleto = actualizado.nombre;
          this.especialidad = actualizado.especialidad;
          this.telefono = actualizado.telefono;
          this.mostrarConfirmacion = true;
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.mensajeError = err.error?.error || 'Error al guardar los cambios del perfil.';
          this.cdr.detectChanges();
        }
      });
  }

  cerrarConfirmacion(): void {
    this.mostrarConfirmacion = false;
  }

  
}
