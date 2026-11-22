import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  // Control del modal de recuperación de contraseña
  mostrarModalRecuperar: boolean = false;
  correoRecuperacion: string = '';
  solicitudEnviada: boolean = false;

  constructor(private router: Router) {}

  seleccionarRol(rol: 'administrador' | 'entrenador'): void {
    this.rolSeleccionado = rol;
  }

  iniciarSesion(): void {
    // Aquí luego conectaremos con el ApiService del backend
    if (this.rolSeleccionado === 'entrenador') {
      this.router.navigate(['/entrenador/clases-dia']);
    } else {
      this.router.navigate(['/admin']);
    }
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
      this.solicitudEnviada = true;
    }
  }
}