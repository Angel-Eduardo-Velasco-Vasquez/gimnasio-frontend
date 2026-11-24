import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private router = inject(Router);

  tipo = signal<'administrador' | 'entrenador'>('administrador');
  usuario = '';
  password = '';
  error = signal('');

  acceder() {
    if (!this.usuario.trim() || !this.password.trim()) {
      this.error.set('Campos incompletos o datos erróneos.');
      return;
    }
    this.error.set('');
    // Datos estáticos: cualquier usuario entra.
    this.router.navigate(['/principal']);
  }
}