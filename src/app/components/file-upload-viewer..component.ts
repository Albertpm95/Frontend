import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-file-upload-viewer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col col-1/4">
      <label for="file" class="text-sm font-medium text-gray-700">
        Selecciona un fichero:
      </label>
      <input
        id="file"
        type="file"
        class="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
        (change)="seleccionarFicheroVariablesIndependientes($event)"
      />
    </div>
    <div class="flex flex-col w-1/2 gap-4">
      <label>Datos leidos:</label>
      <textarea
        [formControl]="matrizTexto"
        class="border p-2 w-full h-24"
      ></textarea>
    </div>
  `,
})
export class FileUploadViewerComponent {
  ficheroVariables: any = undefined;

  matriz: number[][] | undefined = [];

  matrizTexto = new FormControl([]);

  seleccionarFicheroVariablesIndependientes($event: any) {
    this.ficheroVariables = $event.target?.files?.[0];
  }
}
