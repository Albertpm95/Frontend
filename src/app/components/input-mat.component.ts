import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'input-mat',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="flex flex-col p-3">
      <div class="flex flex-col">
        <label for="file" class="block text-gray-700 text-sm font-bold mb-2"
          >Selecciona un fichero de Matlab:</label
        >
        <input
          id="file"
          class="block text-blue-500 text-sm font-bold mb-2 cursor-pointer"
          type="file"
          (change)="seleccionarFichero($event)" />
      </div>
      <ng-content></ng-content>
    </div>
  `,
})
export class MatFileSelectorComponent {
  fichero: File | undefined = undefined;
  matrizTexto = new FormControl<string>('');

  onMatSelectedFile = output<File>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  seleccionarFichero($event: any) {
    this.fichero = $event.target?.files?.[0] as File;

    if (this.fichero) this.onMatSelectedFile.emit(this.fichero);
  }
}
