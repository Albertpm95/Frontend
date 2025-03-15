import { CommonModule } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LoadLocalFilesService } from '@services/internal/load-local-files.service';

@Component({
  selector: 'input-datos',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="flex flex-col p-3">
      <div class="flex flex-col">
        <label for="file" class="block text-gray-700 text-sm font-bold mb-2"
          >Selecciona un fichero:</label
        >
        <input
          id="file"
          class="block text-blue-500 text-sm font-bold mb-2 cursor-pointer"
          type="file"
          (change)="seleccionarFichero($event)" />
      </div>
      <div class="flex flex-col">
        <label class="block text-gray-700 text-sm font-bold mb-2">Datos leidos:</label>
        <textarea
          [formControl]="matrizTexto"
          class="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y min-h-[100px]"></textarea>
      </div>
    </div>
  `,
})
export class FileSelectorComponent {
  loadLocalFilesService = inject(LoadLocalFilesService);

  fichero: File | undefined = undefined;
  matrizTexto = new FormControl<string>('');

  onSelectedFile = output<File>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  seleccionarFichero($event: any) {
    this.fichero = $event.target?.files?.[0] as File;
    if (this.fichero) this.onSelectedFile.emit(this.fichero);
    this.loadLocalFilesService
      .loadTxtFile(this.fichero)
      .subscribe((datosLeidos: string) => {
        this.matrizTexto.setValue(datosLeidos);
      });
  }
}
