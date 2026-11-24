import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-restablecer',
  imports: [FormsModule, RouterLink],
  templateUrl: './restablecer.html',
  styleUrl: './restablecer.css',
})
export class Restablecer {
  correo = '';
  solicitudEnviada = signal(false);

  reestablecer() {
    if (!this.correo.trim()) return;
    this.solicitudEnviada.set(true);
  }

  cerrarModal() {
    this.solicitudEnviada.set(false);
    this.correo = '';
  }
}