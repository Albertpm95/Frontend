import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'input-datos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col p-3">
      <div class="flex flex-col">
        <label for="file" class="block text-gray-700 text-sm font-bold mb-2"
          >Selecciona un fichero con variables independientes:</label
        >
        <input
          id="file"
          class="hidden"
          type="file"
          (change)="seleccionarFicheroVariablesIndependientes($event)" />
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
export class FileIndependientesComponent {
  ficheroVariables: File | undefined = undefined;

  matriz: number[][] | undefined = [];

  matrizTexto = new FormControl([]);

  ficheroSubido = output<File>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  seleccionarFicheroVariablesIndependientes($event: any) {
    this.ficheroVariables = $event.target?.files?.[0] as File;
    if (this.ficheroVariables) this.ficheroSubido.emit(this.ficheroVariables);
  }
}
