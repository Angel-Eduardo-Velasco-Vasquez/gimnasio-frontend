import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UsuarioSesion {
  idUsuario: number;
  usuario: string;
  correo: string;
  rol: 'ADMIN' | 'ENTRENADOR';
  idEntrenador?: number;
}

export interface ClaseHoy {
  idHorario: number;
  idSesion: number;
  nombre: string;
  area?: string;
  fechaHora: string;
  duracionMinutos: number;
  capacidadMaxima: number;
  inscritos: number;
}

export interface AlumnoAsistencia {
  idCliente: number;
  nombre: string;
  estado: 'PENDIENTE' | 'ASISTIO' | 'NO_ASISTIO';
}

export interface AlumnoEntrenador {
  idCliente: number;
  nombre: string;
  email?: string;
  telefono: string;
  ultimaEvaluacion?: {
    fecha: string;
    pesoKg: number;
    porcentajeGrasa: number;
  };
}

export interface RegistroEvaluacion {
  idEvaluacion: number;
  fecha: string;
  pesoKg: number;
  porcentajeGrasa: number;
  notas?: string;
  entrenador: string;
}

export interface HistorialCliente {
  idCliente: number;
  totalRegistros: number;
  pesoInicial?: number;
  pesoActual?: number;
  grasaActual?: number;
  evaluaciones: RegistroEvaluacion[];
}

export interface PerfilEntrenador {
  idEntrenador: number;
  nombre: string;
  especialidad: string;
  telefono: string;
  estado: boolean;
  clasesHoy: number;
  totalAlumnos: number;
  clasesImpartidas: number;
  evaluacionesRealizadas: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = 'http://localhost:8080/backend/api';
  private readonly opciones = { withCredentials: true };

  constructor(private http: HttpClient) {}

  // --- AUTENTICACIÓN ---
  login(usuario: string, password: string, rol: 'ADMIN' | 'ENTRENADOR'): Observable<UsuarioSesion> {
    return this.http.post<UsuarioSesion>(
      `${this.baseUrl}/auth/login`,
      { usuario, password, rol },
      this.opciones
    );
  }

  logout(): Observable<{ mensaje: string }> {
    return this.http.post<{ mensaje: string }>(`${this.baseUrl}/auth/logout`, {}, this.opciones);
  }

  me(): Observable<UsuarioSesion> {
    return this.http.get<UsuarioSesion>(`${this.baseUrl}/auth/me`, this.opciones);
  }

  solicitarRestablecimiento(correo: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/solicitar-restablecimiento`, { correo }, this.opciones);
  }

  // --- ENTRENADOR ---
  getClasesHoy(): Observable<ClaseHoy[]> {
    return this.http.get<ClaseHoy[]>(`${this.baseUrl}/entrenador/clases-hoy`, this.opciones);
  }

  getAlumnosClase(idHorario: number, idSesion: number): Observable<AlumnoAsistencia[]> {
    const params = new HttpParams()
      .set('horario', idHorario)
      .set('sesion', idSesion);
    return this.http.get<AlumnoAsistencia[]>(`${this.baseUrl}/entrenador/alumnos-clase`, {
      ...this.opciones,
      params
    });
  }

  actualizarAsistencia(
    idCliente: number,
    idHorario: number,
    idSesion: number,
    estado: 'PENDIENTE' | 'ASISTIO' | 'NO_ASISTIO'
  ): Observable<{ idCliente: number; estado: string }> {
    return this.http.patch<{ idCliente: number; estado: string }>(
      `${this.baseUrl}/entrenador/asistencia`,
      { idCliente, idHorario, idSesion, estado },
      this.opciones
    );
  }

  getAlumnos(buscar?: string, idSesion?: number): Observable<AlumnoEntrenador[]> {
    let params = new HttpParams();
    if (buscar && buscar.trim()) {
      params = params.set('buscar', buscar.trim());
    }
    if (idSesion) {
      params = params.set('sesion', idSesion);
    }
    return this.http.get<AlumnoEntrenador[]>(`${this.baseUrl}/entrenador/alumnos`, {
      ...this.opciones,
      params
    });
  }

  getEvaluacionesCliente(idCliente: number): Observable<HistorialCliente> {
    const params = new HttpParams().set('cliente', idCliente);
    return this.http.get<HistorialCliente>(`${this.baseUrl}/entrenador/evaluaciones`, {
      ...this.opciones,
      params
    });
  }

  registrarEvaluacion(datos: {
    idCliente: number;
    pesoKg: number;
    porcentajeGrasa: number;
    notas?: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/entrenador/evaluaciones`, datos, this.opciones);
  }

  getPerfil(): Observable<PerfilEntrenador> {
    return this.http.get<PerfilEntrenador>(`${this.baseUrl}/entrenador/perfil`, this.opciones);
  }

  actualizarPerfil(datos: {
    nombre?: string;
    especialidad?: string;
    telefono?: string;
  }): Observable<PerfilEntrenador> {
    return this.http.patch<PerfilEntrenador>(`${this.baseUrl}/entrenador/perfil`, datos, this.opciones);
  }
}