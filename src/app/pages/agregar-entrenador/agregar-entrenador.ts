import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Sidebar } from '../../components/sidebar/sidebar';

interface Mensaje {
  tipo: 'ok' | 'error';
  texto: string;
}

@Component({
  selector: 'app-agregar-entrenador',
  imports: [FormsModule, Sidebar],
  templateUrl: './agregar-entrenador.html',
  styleUrl: './agregar-entrenador.css',
})
export class AgregarEntrenador {
  private router = inject(Router);

  menuAbierto = signal(false);
  mensaje = signal<Mensaje | null>(null);

  nombre = '';
  edad: number | null = null;
  especialidad = 'Musculación';
  experiencia: number | null = null;
  telefono = '';
  archivos: Record<string, string> = {};

  elegirArchivo(campo: string, evento: Event) {
    const input = evento.target as HTMLInputElement;
    this.archivos[campo] = input.files?.[0]?.name ?? '';
  }

  guardar() {
    if (!this.nombre.trim() || !this.edad || !this.experiencia || !this.telefono.trim()) {
      this.mensaje.set({ tipo: 'error', texto: 'Campos incompletos o datos erróneos.' });
      return;
    }
    this.mensaje.set({ tipo: 'ok', texto: 'Entrenador agregado correctamente' });
  }

  limpiar(formulario: NgForm) {
    formulario.resetForm({ especialidad: 'Musculación' });
    this.archivos = {};
  }

  cerrarMensaje() {
    const eraOk = this.mensaje()?.tipo === 'ok';
    this.mensaje.set(null);
    if (eraOk) {
      this.router.navigate(['/entrenadores']);
    }
  }
}