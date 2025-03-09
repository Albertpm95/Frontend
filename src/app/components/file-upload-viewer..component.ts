import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-file-upload-viewer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <label for="file">Selecciona un fichero:</label>
      <input id="file" type="file" (change)="seleccionarFicheroVariablesIndependientes($event)" />
    </div>
    <div>
      <label>Datos leidos:</label>
      <textarea [formControl]="matrizTexto" class="border p-2 w-full h-24"></textarea>
    </div>
  `,
})
export class FileUploadViewerComponent {
  ficheroVariables: any = undefined;

  matriz: number[][] | undefined = [];

  matrizTexto = new FormControl([]);

  ficheroSubido = output();

  seleccionarFicheroVariablesIndependientes($event: any) {
    this.ficheroVariables = $event.target?.files?.[0];
    this.ficheroSubido.emit(this.ficheroVariables);
  }
}
