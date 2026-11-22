import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  rolSeleccionado: 'administrador' | 'entrenador' = 'entrenador';
  usuario: string = '';
  password: string = '';
  mensajeError: string = '';
  cargando: boolean = false;

  mostrarModalRecuperar: boolean = false;
  correoRecuperacion: string = '';
  solicitudEnviada: boolean = false;

  constructor(private router: Router, private api: ApiService) {}

  seleccionarRol(rol: 'administrador' | 'entrenador'): void {
    this.rolSeleccionado = rol;
    this.mensajeError = '';
  }

  iniciarSesion(): void {
    this.mensajeError = '';
    this.cargando = true;
    const rolApi = this.rolSeleccionado === 'entrenador' ? 'ENTRENADOR' : 'ADMIN';

    this.api.login(this.usuario, this.password, rolApi).subscribe({
      next: () => {
        this.cargando = false;
        if (rolApi === 'ENTRENADOR') {
          this.router.navigate(['/entrenador/clases-dia']);
        } else {
          this.router.navigate(['/admin']);
        }
      },
      error: (err) => {
        this.cargando = false;
        this.mensajeError = err.error?.error || 'No se pudo conectar con el servidor (verifica que Tomcat esté encendido).';
      }
    });
  }

  abrirModalRecuperar(): void {
    this.mostrarModalRecuperar = true;
    this.solicitudEnviada = false;
    this.correoRecuperacion = '';
  }

  cerrarModalRecuperar(): void {
    this.mostrarModalRecuperar = false;
    this.solicitudEnviada = false;
  }

  enviarSolicitudRecuperacion(): void {
    if (this.correoRecuperacion.trim()) {
      this.api.solicitarRestablecimiento(this.correoRecuperacion.trim()).subscribe({
        next: () => (this.solicitudEnviada = true),
        error: () => (this.solicitudEnviada = true)
      });
    }
  }
}