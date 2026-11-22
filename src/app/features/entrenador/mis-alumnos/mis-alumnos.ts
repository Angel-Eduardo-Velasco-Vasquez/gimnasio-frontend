import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface RegistroHistorial {
  fecha: string;
  peso: number;
  grasa: number;
  notas: string;
}

interface AlumnoDirectorio {
  id: number;
  nombre: string;
  horarioClase: string;
  pesoInicial: number;
  pesoActual: number;
  grasaInicial: number;
  grasaActual: number;
  haceCuanto: string;
  historial: RegistroHistorial[];
}

@Component({
  selector: 'app-mis-alumnos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mis-alumnos.html',
  styleUrl: './mis-alumnos.css'
})
export class MisAlumnos {
  horarioSeleccionado: string = 'TODOS';
  textoBusqueda: string = '';

  alumnos: AlumnoDirectorio[] = [
    {
      id: 101,
      nombre: 'Jony Beltrán',
      horarioClase: '8 am - CrossFit Avanzado',
      pesoInicial: 82.2,
      pesoActual: 78.5,
      grasaInicial: 20,
      grasaActual: 18,
      haceCuanto: 'Hace 15 días',
      historial: [
        { fecha: '15/08/2026', peso: 79.2, grasa: 18.5, notas: 'Ajuste de plan nutricional en carbohidratos.' },
        { fecha: '15/07/2026', peso: 80.8, grasa: 19.5, notas: 'Inicia rutina de fuerza de 4 días por semana.' },
        { fecha: '15/06/2026', peso: 82.0, grasa: 20.0, notas: 'Evaluación inicial de ingreso al gimnasio.' }
      ]
    },
    {
      id: 102,
      nombre: 'Walter White',
      horarioClase: '8 am - CrossFit Avanzado',
      pesoInicial: 82.2,
      pesoActual: 78.5,
      grasaInicial: 20,
      grasaActual: 18,
      haceCuanto: 'Hace 15 días',
      historial: [
        { fecha: '15/08/2026', peso: 79.2, grasa: 18.5, notas: 'Ajuste de plan nutricional en carbohidratos.' },
        { fecha: '15/07/2026', peso: 80.8, grasa: 19.5, notas: 'Inicia rutina de fuerza de 4 días por semana.' },
        { fecha: '15/06/2026', peso: 82.0, grasa: 20.0, notas: 'Evaluación inicial de ingreso al gimnasio.' }
      ]
    },
    {
      id: 201,
      nombre: 'Luis López',
      horarioClase: '10 am - Entrenamiento Funcional',
      pesoInicial: 81.0,
      pesoActual: 78.5,
      grasaInicial: 20,
      grasaActual: 18,
      haceCuanto: 'Hace 15 días',
      historial: [
        { fecha: '15/08/2026', peso: 78.5, grasa: 18.0, notas: 'Buen progreso en resistencia cardiovascular.' },
        { fecha: '15/06/2026', peso: 81.0, grasa: 20.0, notas: 'Evaluación inicial de ingreso al gimnasio.' }
      ]
    },
    {
      id: 202,
      nombre: 'Eva Martínez',
      horarioClase: '10 am - Entrenamiento Funcional',
      pesoInicial: 80.5,
      pesoActual: 78.5,
      grasaInicial: 19.5,
      grasaActual: 18,
      haceCuanto: 'Hace 15 días',
      historial: [
        { fecha: '15/08/2026', peso: 78.5, grasa: 18.0, notas: 'Excelente técnica en ejercicios funcionales.' },
        { fecha: '15/06/2026', peso: 80.5, grasa: 19.5, notas: 'Evaluación inicial de ingreso al gimnasio.' }
      ]
    },
    {
      id: 103,
      nombre: 'Jerónimo Inocencio',
      horarioClase: '8 am - CrossFit Avanzado',
      pesoInicial: 82.2,
      pesoActual: 78.5,
      grasaInicial: 20,
      grasaActual: 18,
      haceCuanto: 'Hace 15 días',
      historial: [
        { fecha: '15/08/2026', peso: 79.2, grasa: 18.5, notas: 'Ajuste de plan nutricional en carbohidratos.' },
        { fecha: '15/07/2026', peso: 80.8, grasa: 19.5, notas: 'Inicia rutina de fuerza de 4 días por semana.' },
        { fecha: '15/06/2026', peso: 82.0, grasa: 20.0, notas: 'Evaluación inicial de ingreso al gimnasio.' }
      ]
    }
  ];

  // Control Modal Historial
  modalHistorialAbierto: boolean = false;
  alumnoHistorial: AlumnoDirectorio | null = null;

  // Control Modal Nueva Evaluación
  modalEvaluacionAbierto: boolean = false;
  alumnoEvaluacion: AlumnoDirectorio | null = null;
  nuevoPeso: number | null = null;
  nuevaGrasa: number | null = null;
  notasEntrenador: string = '';

  get alumnosFiltrados(): AlumnoDirectorio[] {
    const busqueda = this.textoBusqueda.trim().toLowerCase();
    return this.alumnos.filter(a => {
      const coincideHorario =
        this.horarioSeleccionado === 'TODOS' || a.horarioClase === this.horarioSeleccionado;
      const coincideNombre = !busqueda || a.nombre.toLowerCase().includes(busqueda);
      return coincideHorario && coincideNombre;
    });
  }

  abrirHistorial(alumno: AlumnoDirectorio): void {
    this.alumnoHistorial = alumno;
    this.modalHistorialAbierto = true;
  }

  cerrarHistorial(): void {
    this.modalHistorialAbierto = false;
    this.alumnoHistorial = null;
  }

  abrirEvaluacion(alumno: AlumnoDirectorio): void {
    this.alumnoEvaluacion = alumno;
    this.nuevoPeso = alumno.pesoActual;
    this.nuevaGrasa = alumno.grasaActual;
    this.notasEntrenador = '';
    this.modalEvaluacionAbierto = true;
  }

  cerrarEvaluacion(): void {
    this.modalEvaluacionAbierto = false;
    this.alumnoEvaluacion = null;
  }

  guardarEvaluacion(): void {
    if (this.alumnoEvaluacion && this.nuevoPeso !== null && this.nuevaGrasa !== null) {
      const hoy = new Date().toLocaleDateString('es-MX');
      this.alumnoEvaluacion.pesoActual = this.nuevoPeso;
      this.alumnoEvaluacion.grasaActual = this.nuevaGrasa;
      this.alumnoEvaluacion.haceCuanto = 'Hoy';

      this.alumnoEvaluacion.historial.unshift({
        fecha: hoy,
        peso: this.nuevoPeso,
        grasa: this.nuevaGrasa,
        notas: this.notasEntrenador.trim() || 'Sin observaciones adicionales.'
      });

      this.cerrarEvaluacion();
    }
  }
}