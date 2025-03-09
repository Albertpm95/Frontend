import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FileIndependientesComponent } from '@app/components/input-datos.component';
import { Fichero } from '@interfaces/ficheros.interface';

@Component({
  selector: 'app-home',
  imports: [FileIndependientesComponent],
  styles: [``],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <div class="grid md:grid-cols-2 grid-cols-4 gap-4">
        @for (fichero of ficheros; track fichero.id; let index = $index) {
          <input-datos
            class="bg-gray-200 auto cursor-pointer border-solid"
            (ficheroSubido)="ficheroSubido($event, index)"></input-datos>
        }
        @if (ficheros.length < 4) {
          <div
            (click)="addFicheroExtra()"
            class="flex flex-col items-center justify-center bg-gray-200 cursor-pointer border-solid">
            <span class="block text-gray-700 text-sm font-bold mb-2"
              >Añadir un fichero extra (max. 4)</span
            >
            <i class="text-2xl text-gray-400 font-bold mb-2">+</i>
          </div>
        }
      </div>

      <button (click)="enviar()">Enviar</button>
    </div>
  `,
})
export class InputDatosModuleComponent {
  tipo = input<string>();
  ficheros: { id: number; fichero: Fichero | undefined }[] = [
    { id: 0, fichero: undefined },
  ];

  public ficheroSubido(event: File, index: number) {
    if (this.ficheros)
      this.ficheros[index + 1] = { id: index + 1, fichero: event as Fichero };
  }

  public addFicheroExtra() {
    if (this.ficheros && this.ficheros.length < 4) {
      this.ficheros.push({ id: this.ficheros.length, fichero: undefined });
    }
  }

  public enviar() {
    console.log('Ficheros seleccionados ', this.ficheros);
  }
}
