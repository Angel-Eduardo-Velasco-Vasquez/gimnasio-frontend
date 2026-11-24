import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Sidebar } from '../../components/sidebar/sidebar';

interface Mensaje {
  tipo: 'ok' | 'error';
  texto: string;
}

@Component({
  selector: 'app-registro-usuario',
  imports: [FormsModule, Sidebar],
  templateUrl: './registro-usuario.html',
  styleUrl: './registro-usuario.css',
})
export class RegistroUsuario {
  private router = inject(Router);

  menuAbierto = signal(false);
  mensaje = signal<Mensaje | null>(null);

  nombre = '';
  tipoSuscripcion = '';
  telefono = '';
  fechaRegistro = '';

  tiposSuscripcion = ['Mensual', 'Trimestral', 'Anual'];

  guardar() {
    if (!this.nombre.trim() || !this.tipoSuscripcion || !this.telefono.trim() || !this.fechaRegistro) {
      this.mensaje.set({ tipo: 'error', texto: 'Verifique la información' });
      return;
    }
    this.mensaje.set({ tipo: 'ok', texto: 'Usuario agregado correctamente' });
  }

  limpiar(formulario: NgForm) {
    formulario.resetForm({ tipoSuscripcion: '' });
  }

  cerrarMensaje() {
    const eraOk = this.mensaje()?.tipo === 'ok';
    this.mensaje.set(null);
    if (eraOk) {
      this.router.navigate(['/clientes']);
    }
  }
}