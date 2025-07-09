import { Component, inject, output } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { LoadLocalFilesService } from "@services/internal/load-local-files"
@Component({
	selector: "input-datos",
	imports: [ReactiveFormsModule],
	template: `
    <div class="flex flex-col gap-4 p-4 m-4 bg-gray-200 rounded-lg shadow">
      <div class="flex flex-col gap-4 p-2">
        <label for="file" class="text-gray-700 text-sm font-medium"
          >Selecciona un fichero:</label
        >
        <input
          id="file"
          class="block text-blue-500 text-sm font-bold mb-2 cursor-pointer"
          type="file"
          (change)="seleccionarFichero($event)" />
      </div>
      <div class="flex flex-col  items-center gap-4  bg-gray-100">
        <label class="text-gray-700 text-sm font-medium">Datos leidos:</label>
        <textarea
          [formControl]="matrizTexto"
          class="w-full p-3 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y min-h-[100px]"></textarea>
      </div>
    </div>
  `,
})
export class FileSelectorComponent {
	private readonly loadLocalFilesService = inject(LoadLocalFilesService);
	fichero: File | undefined = undefined;
	matrizTexto = new FormControl<string>("");
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
