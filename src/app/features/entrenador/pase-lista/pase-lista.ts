import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

interface AlumnoClase {
  id: number;
  nombre: string;
  peso: number;
  grasa: number;
  haceCuanto: string;
  asistencia: 'Pendiente' | 'Asistió' | 'No asistió';
}

interface InfoClase {
  id: number;
  titulo: string;
  fecha: string;
  inscritos: number;
  cupoMaximo: number;
  alumnos: AlumnoClase[];
}

@Component({
  selector: 'app-pase-lista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pase-lista.html',
  styleUrl: './pase-lista.css'
})
export class PaseLista implements OnInit {
  idClase: number = 1;
  textoBusqueda: string = '';

  // Datos simulados de las clases del PDF (luego vendrán del Backend)
  private catalogoClases: Record<number, InfoClase> = {
    1: {
      id: 1,
      titulo: '8 a.m - CrossFit Avanzado',
      fecha: '30 de Septiembre de 2026',
      inscritos: 12,
      cupoMaximo: 15,
      alumnos: [
        { id: 101, nombre: 'Jony Beltrán', peso: 78.5, grasa: 18, haceCuanto: 'Hace 15 días', asistencia: 'Pendiente' },
        { id: 102, nombre: 'Walter White', peso: 64.5, grasa: 15, haceCuanto: 'Hace 1 mes', asistencia: 'Pendiente' },
        { id: 103, nombre: 'Jerónimo Inocencio', peso: 73.5, grasa: 13, haceCuanto: 'Hace 24 días', asistencia: 'Pendiente' }
      ]
    },
    2: {
      id: 2,
      titulo: '10 a.m - Entrenamiento Funcional',
      fecha: '30 de Septiembre de 2026',
      inscritos: 8,
      cupoMaximo: 15,
      alumnos: [
        { id: 201, nombre: 'Luis López', peso: 60.5, grasa: 15, haceCuanto: 'Hace 10 días', asistencia: 'Pendiente' },
        { id: 202, nombre: 'Eva Martínez', peso: 55.6, grasa: 15, haceCuanto: 'Hace 1 mes', asistencia: 'Pendiente' },
        { id: 203, nombre: 'Sofía Vásquez', peso: 78.5, grasa: 25, haceCuanto: 'Hace 24 días', asistencia: 'Pendiente' }
      ]
    }
  };

  claseActual!: InfoClase;

  // Control del Modal de Evaluación Física
  modalEvaluacionAbierto: boolean = false;
  alumnoSeleccionado: AlumnoClase | null = null;
  nuevoPeso: number | null = null;
  nuevaGrasa: number | null = null;
  notasEntrenador: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const paramId = Number(this.route.snapshot.paramMap.get('idClase'));
    this.idClase = paramId && this.catalogoClases[paramId] ? paramId : 1;
    this.claseActual = this.catalogoClases[this.idClase];
  }

  get alumnosFiltrados(): AlumnoClase[] {
    const filtro = this.textoBusqueda.trim().toLowerCase();
    if (!filtro) {
      return this.claseActual.alumnos;
    }
    return this.claseActual.alumnos.filter(a =>
      a.nombre.toLowerCase().includes(filtro)
    );
  }

  volverAClases(): void {
    this.router.navigate(['/entrenador/clases-dia']);
  }

  abrirModalEvaluacion(alumno: AlumnoClase): void {
    this.alumnoSeleccionado = alumno;
    this.nuevoPeso = alumno.peso;
    this.nuevaGrasa = alumno.grasa;
    this.notasEntrenador = '';
    this.modalEvaluacionAbierto = true;
  }

  cerrarModalEvaluacion(): void {
    this.modalEvaluacionAbierto = false;
    this.alumnoSeleccionado = null;
  }

  guardarEvaluacion(): void {
    if (this.alumnoSeleccionado && this.nuevoPeso !== null && this.nuevaGrasa !== null) {
      this.alumnoSeleccionado.peso = this.nuevoPeso;
      this.alumnoSeleccionado.grasa = this.nuevaGrasa;
      this.alumnoSeleccionado.haceCuanto = 'Hoy';
      this.cerrarModalEvaluacion();
    }
  }
}