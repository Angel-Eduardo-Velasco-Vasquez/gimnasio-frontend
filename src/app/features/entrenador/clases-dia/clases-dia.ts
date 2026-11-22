import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService, ClaseHoy } from '../../../core/services/api';

@Component({
  selector: 'app-clases-dia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clases-dia.html',
  styleUrl: './clases-dia.css'
})
export class ClasesDia implements OnInit {
  nombreEntrenador: string = '';
  especialidad: string = '';
  totalAlumnos: number = 0;
  clasesHoy: ClaseHoy[] = [];
  cargando: boolean = true;

  constructor(private router: Router, private api: ApiService) {}

  ngOnInit(): void {
    this.api.getPerfil().subscribe({
      next: (perfil) => {
        this.nombreEntrenador = perfil.nombre;
        this.especialidad = perfil.especialidad;
        this.totalAlumnos = perfil.totalAlumnos;
      },
      error: (err) => {
        if (err.status === 401) this.router.navigate(['/login']);
      }
    });

    this.api.getClasesHoy().subscribe({
      next: (clases) => {
        this.clasesHoy = clases;
        this.cargando = false;
      },
      error: (err) => {
        this.cargando = false;
        if (err.status === 401) this.router.navigate(['/login']);
      }
    });
  }

  formatearHora(fechaHora: string): string {
    if (!fechaHora || !fechaHora.includes('T')) return fechaHora;
    const horaStr = fechaHora.split('T')[1]; // ej. "19:00"
    const [hStr, mStr] = horaStr.split(':');
    const h = Number(hStr);
    const sufijo = h >= 12 ? 'p.m' : 'a.m';
    const hora12 = h % 12 === 0 ? 12 : h % 12;
    return mStr === '00' ? `${hora12} ${sufijo}` : `${hora12}:${mStr} ${sufijo}`;
  }

  irATomarAsistencia(clase: ClaseHoy): void {
    this.router.navigate(['/entrenador/pase-lista', clase.idHorario, clase.idSesion], {
      state: { clase }
    });
  }
}