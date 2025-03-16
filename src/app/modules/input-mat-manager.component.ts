import { Component, inject } from '@angular/core';
import { FicheroService } from '@services/external/ficheros.service';
import { MatFileSelectorComponent } from '../components/input-mat.component';

@Component({
  selector: 'app-input-mat-manager',
  imports: [MatFileSelectorComponent],
  template: `
    <div class="grid xs:grid-cols-2 grid-cols-4 gap-4">
      <input-mat (onMatSelectedFile)="selectFile($event)">
        @if (columnas) {
          <div class="flex flex-col">
            <label class="block text-gray-700 text-sm font-bold mb-2">Columnas:</label>
            <ul>
              @for (columna of columnas; track columna; let index = $index) {
                <li>{{ columna }}</li>
              }
            </ul>
          </div>
        }
      </input-mat>
    </div>
  `,
})
export class InputMatManagerComponent {
  readonly #ficheroService = inject(FicheroService);
  columnas: string[] = [];
  public selectFile(event: File) {
    if (event) {
      console.log('Fichero mat: ', event);

      this.#ficheroService.enviarFicheroMat(event).subscribe((response: string[]) => {
        this.columnas = response;
      });
    }
  }
}
