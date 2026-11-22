import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ApiService } from '../../../core/services/api';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout implements OnInit {
  menuOculto: boolean = false;
  dropdownUsuarioAbierto: boolean = false;
  nombreEntrenador: string = 'Entrenador';

  constructor(private router: Router, private api: ApiService) {}

  ngOnInit(): void {
    this.api.getPerfil().subscribe({
      next: (perfil) => (this.nombreEntrenador = perfil.nombre),
      error: (err) => {
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    });
  }

  alternarMenu(): void {
    this.menuOculto = !this.menuOculto;
  }

  alternarDropdownUsuario(): void {
    this.dropdownUsuarioAbierto = !this.dropdownUsuarioAbierto;
  }

  cerrarSesion(): void {
    this.dropdownUsuarioAbierto = false;
    this.api.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => this.router.navigate(['/login'])
    });
  }
}