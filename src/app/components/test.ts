import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { FicherosServidorSeleccionadosComponent } from './lista-ficheros-servidor-seleccionados.component';
import { FicherosServidorComponent } from './lista-ficheros-servidor.component';
import { SubidaFicherosComponent } from './subida-fichero.component';
@Component({
  template: `
    <div class="cuadro-principal p-grid p-jc-center p-ai-start p-mt-5">
      <div class="p-col-12 p-md-10">
        <div class="p-grid p-jc-between p-ai-start">
          <!-- Lista de ficheros en el servidor -->
          <div class="p-col-12 p-md-6">
            <p-card>
              <ng-template pTemplate="title">
                Ficheros en el Servidor
              </ng-template>
              <ng-template pTemplate="content">
                <app-ficheros-servidor></app-ficheros-servidor>
              </ng-template>
            </p-card>
          </div>

          <!-- Lista de ficheros seleccionados -->
          <div class="p-col-12 p-md-6">
            <p-card>
              <ng-template pTemplate="title">
                Ficheros Seleccionados
              </ng-template>
              <ng-template pTemplate="content">
                <app-ficheros-servidor-seleccionados></app-ficheros-servidor-seleccionados>
              </ng-template>
            </p-card>
          </div>
        </div>

        <p-divider></p-divider>

        <!-- Subir fichero -->
        <p-card>
          <ng-template pTemplate="title"> Subir Nuevo Fichero </ng-template>
          <ng-template pTemplate="content">
            <app-subida-fichero></app-subida-fichero>
          </ng-template>
        </p-card>
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
    CardModule,
    DividerModule,
  ],
})
export class TestComponent {}
