import { Component } from '@angular/core';
import { FicherosServidorSeleccionadosComponent } from './lista-ficheros-servidor-seleccionados.component';
import { FicherosServidorComponent } from './lista-ficheros-servidor.component';
import { SubidaFicherosComponent } from './subida-fichero.component';
@Component({
  template: `
    <div class="flex flex-col items-center mt-5">
      <div class="w-full md:w-10/12">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white shadow-md rounded-lg p-4">
            <app-ficheros-servidor></app-ficheros-servidor>
          </div>

          <div class="bg-white shadow-md rounded-lg p-4">
            <app-ficheros-servidor-seleccionados></app-ficheros-servidor-seleccionados>
          </div>
        </div>

        <div class="my-6 border-t border-gray-300"></div>

        <!-- Subir fichero -->
        <div class="bg-white shadow-md rounded-lg p-4">
          <div class="text-lg font-semibold mb-2">Subir Nuevo Fichero</div>
          <div>
            <app-subida-fichero></app-subida-fichero>
          </div>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  styles: [
    `
      .p-card {
        min-height: 300px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .cuadro-principal {
        max-width: 1200px;
        margin: auto;
      }

      .p-divider {
        margin: 2rem 0;
      }
    `,
  ],

  imports: [
    SubidaFicherosComponent,
    FicherosServidorComponent,
    FicherosServidorSeleccionadosComponent,
  ],
})
export class TestComponent {}
