import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface ClaseProgramada {
  id: number;
  horario: string;
  nombre: string;
  area: string;
  duracion: string;
  inscritos: number;
  cupoMaximo: number;
  colorCupo: 'amarillo' | 'verde';
}

@Component({
  selector: 'app-clases-dia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clases-dia.html',
  styleUrl: './clases-dia.css'
})
export class ClasesDia {
  nombreEntrenador: string = 'Carlos';
  especialidad: string = 'CrossFit';

  clasesHoy: ClaseProgramada[] = [
    {
      id: 1,
      horario: '8 a.m',
      nombre: 'CrossFit Avanzado',
      area: 'Área Zona A (Principal)',
      duracion: '60 min',
      inscritos: 12,
      cupoMaximo: 15,
      colorCupo: 'amarillo'
    },
    {
      id: 2,
      horario: '10 a.m',
      nombre: 'Entrenamiento Funcional',
      area: 'Área Zona B',
      duracion: '60 min',
      inscritos: 8,
      cupoMaximo: 15,
      colorCupo: 'verde'
    }
  ];

  constructor(private router: Router) {}

  get totalAlumnosHoy(): number {
    return this.clasesHoy.reduce((total, c) => total + c.inscritos, 0);
  }

  irATomarAsistencia(idClase: number): void {
    this.router.navigate(['/entrenador/pase-lista', idClase]);
  }
}