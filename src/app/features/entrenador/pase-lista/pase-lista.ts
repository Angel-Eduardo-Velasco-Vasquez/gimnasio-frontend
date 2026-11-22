import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, AlumnoAsistencia, ClaseHoy } from '../../../core/services/api';

@Component({
  selector: 'app-pase-lista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pase-lista.html',
  styleUrl: './pase-lista.css'
})
export class PaseLista implements OnInit {
  idHorario: number = 0;
  idSesion: number = 0;
  infoClase: ClaseHoy | null = null;

  textoBusqueda: string = '';
  alumnos: AlumnoAsistencia[] = [];
  mensajeError: string = '';

  // Modal Evaluación Física
  modalEvaluacionAbierto: boolean = false;
  alumnoSeleccionado: AlumnoAsistencia | null = null;
  nuevoPeso: number | null = null;
  nuevaGrasa: number | null = null;
  notasEntrenador: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras.state?.['clase']) {
      this.infoClase = nav.extras.state['clase'];
    }
  }

  ngOnInit(): void {
    this.idHorario = Number(this.route.snapshot.paramMap.get('idHorario'));
    this.idSesion = Number(this.route.snapshot.paramMap.get('idSesion'));
    this.cargarAlumnos();
  }

  cargarAlumnos(): void {
    this.api.getAlumnosClase(this.idHorario, this.idSesion).subscribe({
      next: (lista) => (this.alumnos = lista),
      error: (err) => {
        if (err.status === 401) {
          this.router.navigate(['/login']);
        } else {
          this.mensajeError = err.error?.error || 'Error al cargar los alumnos de la clase.';
        }
      }
    });
  }

  get alumnosFiltrados(): AlumnoAsistencia[] {
    const filtro = this.textoBusqueda.trim().toLowerCase();
    if (!filtro) return this.alumnos;
    return this.alumnos.filter(a => a.nombre.toLowerCase().includes(filtro));
  }

  cambiarAsistencia(alumno: AlumnoAsistencia): void {
    this.api
      .actualizarAsistencia(alumno.idCliente, this.idHorario, this.idSesion, alumno.estado)
      .subscribe({
        error: (err) => {
          alert(err.error?.error || 'No se pudo actualizar la asistencia.');
          this.cargarAlumnos();
        }
      });
  }

  volverAClases(): void {
    this.router.navigate(['/entrenador/clases-dia']);
  }

  abrirModalEvaluacion(alumno: AlumnoAsistencia): void {
    this.alumnoSeleccionado = alumno;
    this.nuevoPeso = null;
    this.nuevaGrasa = null;
    this.notasEntrenador = '';
    this.modalEvaluacionAbierto = true;
  }

  cerrarModalEvaluacion(): void {
    this.modalEvaluacionAbierto = false;
    this.alumnoSeleccionado = null;
  }

  guardarEvaluacion(): void {
    if (!this.alumnoSeleccionado || this.nuevoPeso === null || this.nuevaGrasa === null) return;

    this.api
      .registrarEvaluacion({
        idCliente: this.alumnoSeleccionado.idCliente,
        pesoKg: this.nuevoPeso,
        porcentajeGrasa: this.nuevaGrasa,
        notas: this.notasEntrenador.trim() || undefined
      })
      .subscribe({
        next: () => this.cerrarModalEvaluacion(),
        error: (err) => alert(err.error?.error || 'Error al guardar la evaluación física.')
      });
  }
}