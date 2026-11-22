import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {
  menuOculto: boolean = false;
  dropdownUsuarioAbierto: boolean = false;
  nombreEntrenador: string = 'Carlos Beltrán';

  constructor(private router: Router) {}

  alternarMenu(): void {
    this.menuOculto = !this.menuOculto;
  }

  alternarDropdownUsuario(): void {
    this.dropdownUsuarioAbierto = !this.dropdownUsuarioAbierto;
  }

  cerrarSesion(): void {
    this.dropdownUsuarioAbierto = false;
    this.router.navigate(['/login']);
  }
}