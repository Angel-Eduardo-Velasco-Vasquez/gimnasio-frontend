import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private router = inject(Router);
  private auth = inject(AuthService);

  tipo = signal<'administrador' | 'entrenador'>('administrador');
  usuario = '';
  password = '';
  error = signal('');
  cargando = signal(false);

  acceder() {
    if (!this.usuario.trim() || !this.password.trim()) {
      this.error.set('Campos incompletos o datos erróneos.');
      return;
    }

    const rol = this.tipo() === 'administrador' ? 'ADMIN' : 'ENTRENADOR';

    this.cargando.set(true);
    this.error.set('');

    this.auth.login(this.usuario, this.password, rol).subscribe({
      next: () => {
        this.cargando.set(false);
        this.router.navigate(['/principal']);
      },
      error: (err) => {
        this.cargando.set(false);
        this.error.set(err.error?.error ?? 'No se pudo conectar con el servidor.');
      },
    });
  }
}