import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FileUploadViewerComponent } from '@app/components/file-upload-viewer..component';

@Component({
  selector: 'app-home',
  imports: [FileUploadViewerComponent],
  styles: [``],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid grid-cols-4 gap-4">
      @for (fichero of ficheros; track fichero.id; let index = $index) {
        <app-file-upload-viewer
          class="bg-gray-200 auto cursor-pointer border-solid"
          (ficheroSubido)="ficheroSubido($event, index)"></app-file-upload-viewer>
      }
      @if (ficheros.length < 4) {
        <div
          (click)="addFicheroExtra()"
          class="flex flex-col items-center justify-center bg-gray-200 cursor-pointer border-solid">
          <span class="text-center">Añadir un fichero extra (max. 4)</span>
          <i class="text-2xl">+</i>
        </div>
      }
    </div>
    <button (click)="enviar()">Enviar</button>
  `,
})
export class HomeComponent {
  ficheros: { id: number; fichero: any }[] = [{ id: 0, fichero: undefined }];

  public ficheroSubido(event: any, index: number) {
    if (this.ficheros) this.ficheros[index + 1] = { id: index + 1, fichero: event };
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
