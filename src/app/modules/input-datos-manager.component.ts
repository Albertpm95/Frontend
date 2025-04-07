import { Component, inject, input } from "@angular/core";
import { FileSelectorComponent } from "@app/components/input-datos.component";
import type { Fichero } from "@interfaces/ficheros.interface";
import { FilesListService } from "@services/internal/files-list.service";

type VariableOptions = "DEPENDIENTE" | "INDEPENDIENTE" | "PLOT" | "MAT";

@Component({
	selector: "app-input-datos-manager",
	imports: [FileSelectorComponent],
	template: `
    <div class="grid xs:grid-cols-2 grid-cols-4 gap-4 bg-gray-100 rounded-lg shadow">
      @for (fichero of ficheros; track fichero.id; let index = $index) {
        <input-datos
          class="auto cursor-pointer"
          (onSelectedFile)="selectFile($event)"></input-datos>
      }
      @if (ficheros.length < 4) {
        <div
          (click)="addFicheroExtra()"
          class="flex flex-col gap-4 p-4 m-4 bg-gray-200 items-center align-middle rounded-lg shadow">
          <span class="block text-gray-700 text-sm font-bold mb-2"
            >Añadir un fichero extra (max. 4)</span
          >
          <i class="text-2xl text-gray-400 font-bold mb-2">+</i>
          <button type="button" class="button" (click)="limpiarUltimoFichero()">
            Eliminar ultimo
          </button>
        </div>
      }
    </div>
  `,
})
export class InputDatosManagerComponent {
	readonly #filesListService = inject(FilesListService);
	tipo = input.required<VariableOptions>();
	ficheros: { id: number; fichero: Fichero | undefined }[] = [
		{ id: 0, fichero: undefined },
	];

	public limpiarUltimoFichero() {
		switch (this.tipo()) {
			case "INDEPENDIENTE":
				this.#filesListService.eliminarUltimoFicheroMatriz();
				this.ficheros.pop();
				break;
			case "PLOT":
				this.#filesListService.eliminarUltimoFicheroPlot();
				this.ficheros.pop();
				break;
			default:
				break;
		}
		console.log("Eliminado ultimo ", this.ficheros);
	}
	public selectFile(event: File) {
		if (event)
			switch (this.tipo()) {
				case "INDEPENDIENTE":
					this.#filesListService.setFicheroMatriz(event);
					break;
				case "PLOT":
					this.#filesListService.setFicheroPlot(event);
					break;
				default:
					break;
			}
	}

	public addFicheroExtra() {
		if (this.ficheros && this.ficheros.length < 4) {
			this.ficheros.push({ id: this.ficheros.length, fichero: undefined });
		}
	}
}
