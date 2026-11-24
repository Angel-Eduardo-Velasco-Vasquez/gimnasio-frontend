import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Sidebar } from '../../components/sidebar/sidebar';

interface Entrenador {
  nombre: string;
  tiempo: string;
  especialidad: string;
  clientes: number;
  estatus: string;
}

@Component({
  selector: 'app-entrenadores',
  imports: [RouterLink, Sidebar],
  templateUrl: './entrenadores.html',
  styleUrl: './entrenadores.css',
})
export class Entrenadores {
  menuAbierto = signal(false);
  indiceAEliminar = signal<number | null>(null);

  entrenadores = signal<Entrenador[]>([
    { nombre: 'Hany Rambod', tiempo: '25 años', especialidad: 'Culturistas', clientes: 6, estatus: 'Activo' },
  ]);

  pedirEliminar(indice: number) {
    this.indiceAEliminar.set(indice);
  }

  cancelar() {
    this.indiceAEliminar.set(null);
  }

  confirmarEliminar() {
    const indice = this.indiceAEliminar();
    if (indice === null) return;
    this.entrenadores.update(lista => lista.filter((_, i) => i !== indice));
    this.indiceAEliminar.set(null);
  }
}