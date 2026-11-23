import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ApiService,
  AlumnoEntrenador,
  ClaseHoy,
  HistorialCliente
} from '../../../core/services/api';

@Component({
  selector: 'app-mis-alumnos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mis-alumnos.html',
  styleUrl: './mis-alumnos.css'
})
export class MisAlumnos implements OnInit {
  sesionSeleccionada: number | undefined = undefined;
  textoBusqueda: string = '';

  clasesDisponibles: ClaseHoy[] = [];
  alumnos: AlumnoEntrenador[] = [];

  // Modal Historial
  modalHistorialAbierto: boolean = false;
  alumnoHistorialNombre: string = '';
  historialActual: HistorialCliente | null = null;

  // Modal Evaluación
  modalEvaluacionAbierto: boolean = false;
  alumnoEvaluacion: AlumnoEntrenador | null = null;
  nuevoPeso: number | null = null;
  nuevaGrasa: number | null = null;
  notasEntrenador: string = '';

  constructor(
    private api: ApiService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.api.getClasesHoy().subscribe({
      next: (clases) => {
        this.clasesDisponibles = clases;
        this.cdr.detectChanges();
      },
      error: () => {}
    });
    this.buscarAlumnos();
  }

  buscarAlumnos(): void {
    this.api.getAlumnos(this.textoBusqueda, this.sesionSeleccionada).subscribe({
      next: (lista) => {
        this.alumnos = lista;
        this.cdr.detectChanges();
      },
      error: (err) => {
        if (err.status === 401) this.router.navigate(['/login']);
      }
    });
  }

  abrirHistorial(alumno: AlumnoEntrenador): void {
    this.alumnoHistorialNombre = alumno.nombre;
    this.historialActual = null;
    this.modalHistorialAbierto = true;

    this.api.getEvaluacionesCliente(alumno.idCliente).subscribe({
      next: (data) => {
        this.historialActual = data;
        this.cdr.detectChanges();
      },
      error: (err) => alert(err.error?.error || 'No se pudo cargar el historial.')
    });
  }

  cerrarHistorial(): void {
    this.modalHistorialAbierto = false;
    this.historialActual = null;
  }

  abrirEvaluacion(alumno: AlumnoEntrenador): void {
    this.alumnoEvaluacion = alumno;
    this.nuevoPeso = alumno.ultimaEvaluacion?.pesoKg ?? null;
    this.nuevaGrasa = alumno.ultimaEvaluacion?.porcentajeGrasa ?? null;
    this.notasEntrenador = '';
    this.modalEvaluacionAbierto = true;
  }

  cerrarEvaluacion(): void {
    this.modalEvaluacionAbierto = false;
    this.alumnoEvaluacion = null;
  }

  get evaluacionValida(): boolean {
    const pesoOk = this.nuevoPeso !== null && this.nuevoPeso >= 25 && this.nuevoPeso <= 300;
    const grasaOk = this.nuevaGrasa !== null && this.nuevaGrasa >= 2 && this.nuevaGrasa <= 70;
    return pesoOk && grasaOk;
  }

  guardarEvaluacion(): void {
    if (!this.alumnoEvaluacion || !this.evaluacionValida) return;

    this.api
      .registrarEvaluacion({
        idCliente: this.alumnoEvaluacion.idCliente,
        pesoKg: Number(this.nuevoPeso),
        porcentajeGrasa: Number(this.nuevaGrasa),
        notas: this.notasEntrenador.trim().slice(0, 250) || undefined
      })
      .subscribe({
        next: () => {
          this.cerrarEvaluacion();
          this.buscarAlumnos();
          this.cdr.detectChanges();
        },
        error: (err) => alert(err.error?.error || 'Error al registrar la evaluación.')
      });
  }
}