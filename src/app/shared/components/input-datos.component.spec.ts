import { type ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { of } from "rxjs";
import { FileSelectorComponent } from "./input-datos.component";
import { LoadLocalFilesService } from "@services/internal/load-local-files"
describe("FileSelectorComponent", () => {
	let component: FileSelectorComponent;
	let fixture: ComponentFixture<FileSelectorComponent>;
	let mockLoadLocalFilesService: jasmine.SpyObj<LoadLocalFilesService>;
	beforeEach(async () => {
		// Crear un mock del servicio LoadLocalFilesService
		mockLoadLocalFilesService = jasmine.createSpyObj("LoadLocalFilesService", [
			"loadTxtFile",
		]);
		await TestBed.configureTestingModule({
			declarations: [FileSelectorComponent],
			imports: [ReactiveFormsModule],
			providers: [
				{ provide: LoadLocalFilesService, useValue: mockLoadLocalFilesService },
			],
		}).compileComponents();
		fixture = TestBed.createComponent(FileSelectorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
	it("debería crearse el componente", () => {
		expect(component).toBeTruthy();
	});
	it("debería emitir el fichero seleccionado al evento onSelectedFile", () => {
		const mockFile = new File(["contenido de prueba"], "test.txt", {
			type: "text/plain",
		});
		const onSelectedFileSpy = spyOn(component.onSelectedFile, "emit");
		// Simular la selección de un archivo
		const event = { target: { files: [mockFile] } };
		component.seleccionarFichero(event);
		expect(onSelectedFileSpy).toHaveBeenCalledWith(mockFile);
		expect(component.fichero).toBe(mockFile);
	});
	it("debería leer el contenido del fichero y actualizar el textarea", () => {
		const mockFile = new File(["contenido de prueba"], "test.txt", {
			type: "text/plain",
		});
		const mockContent = "contenido de prueba";
		mockLoadLocalFilesService.loadTxtFile.and.returnValue(of(mockContent));
		// Simular la selección de un archivo
		const event = { target: { files: [mockFile] } };
		component.seleccionarFichero(event);
		expect(mockLoadLocalFilesService.loadTxtFile).toHaveBeenCalledWith(
			mockFile,
		);
		expect(component.matrizTexto.value).toBe(mockContent);
	});
	it("debería no hacer nada si no se selecciona un fichero", () => {
		const onSelectedFileSpy = spyOn(component.onSelectedFile, "emit");
		// Simular un evento sin archivo seleccionado
		const event = { target: { files: [] } };
		component.seleccionarFichero(event);
		expect(onSelectedFileSpy).not.toHaveBeenCalled();
		expect(component.fichero).toBeUndefined();
	});
});
