import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Sidebar } from '../../components/sidebar/sidebar';

interface Cliente {
  nombre: string;
  suscripcion: string;
  fechaPago: string;
  estatus: string;
}

@Component({
  selector: 'app-clientes',
  imports: [RouterLink, Sidebar],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css',
})
export class Clientes {
  menuAbierto = signal(false);
  indiceAEliminar = signal<number | null>(null);

  clientes = signal<Cliente[]>([
    { nombre: 'Yescas Pacheco', suscripcion: 'Mensual', fechaPago: '15/10/2026', estatus: 'Activo' },
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
    this.clientes.update(lista => lista.filter((_, i) => i !== indice));
    this.indiceAEliminar.set(null);
  }
}