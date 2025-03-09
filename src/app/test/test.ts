import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestDatosDirectosComponent } from './datos-directos.component';
import { FicherosServidorSeleccionadosComponent } from './lista-ficheros-servidor-seleccionados.component';
import { FicherosServidorComponent } from './lista-ficheros-servidor.component';
import { Subida3FicherosComponent } from './subida-3-ficheros.component';
import { SubidaFicherosComponent } from './subida-fichero.component';
@Component({
  template: `
    <div>
      <h1>Componentes para testar</h1>
      <app-test-datos-directos></app-test-datos-directos>
    </div>
    <!-- <div class="overflow-x-auto flex flex-col items-center mt-5">
      <div class="grid grid-cols-2 gap-6">
        <div class=" border-gray-600  p-4">
          <app-ficheros-servidor></app-ficheros-servidor>
        </div>

        <div class=" border-gray-600 p-4">
          <app-ficheros-servidor-seleccionados></app-ficheros-servidor-seleccionados>
        </div>
      </div>

      <div class=" border-gray-600 mt-5 p-4">
        <div class="text-lg font-semibold mb-2">Subir Nuevo Fichero</div>
        <div>
          <app-subida-fichero></app-subida-fichero>
        </div>
        <app-subida-3-fichero></app-subida-3-fichero>
      </div>
    </div> -->
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    Subida3FicherosComponent,
    TestDatosDirectosComponent,
  ],
})
export class TestComponent {}
