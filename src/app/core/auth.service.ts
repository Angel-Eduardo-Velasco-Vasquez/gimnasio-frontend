import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './api.config';

export interface SesionUsuario {
  idUsuario: number;
  usuario: string;
  correo: string;
  rol: 'ADMIN' | 'ENTRENADOR';
  idEntrenador?: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  login(usuario: string, password: string, rol: 'ADMIN' | 'ENTRENADOR'): Observable<SesionUsuario> {
    return this.http.post<SesionUsuario>(`${API_URL}/auth/login`, { usuario, password, rol });
  }

  logout(): Observable<unknown> {
    return this.http.post(`${API_URL}/auth/logout`, {});
  }
}