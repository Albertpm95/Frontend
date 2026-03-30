import { HttpClient } from "@angular/common/http"
import { Injectable, inject } from "@angular/core"
import { RegresionMultipleResponse } from "@interfaces/regresion-multiple-response"
import { FilesListService } from "@services/internal/files-list"
import { endpoints } from "endpoints"
import { environment } from "environment"
import { Observable } from "rxjs"
@Injectable({
	providedIn: "root",
})
export class FicheroService {
	#filesListService = inject(FilesListService);
	#http = inject(HttpClient);
	ejecutarRegresionLinealMultiplesFicherosConcatenados(
		test_size: number | undefined,
		train_size: number | undefined,
		random_state: number | undefined,
		shuffle: boolean | undefined,
		stratify: string | undefined,
		intercept: boolean | undefined,
		method: string | undefined,
	): Observable<RegresionMultipleResponse> {
		const formData = new FormData();
		if (method) formData.append("method", method);
		if (test_size) formData.append("test_size", test_size.toString());
		if (train_size) formData.append("train_size", train_size.toString());
		if (random_state) formData.append("random_state", random_state.toString());
		if (shuffle) formData.append("shuffle", shuffle.toString());
		if (stratify) formData.append("stratify", stratify.toString());
		if (intercept) formData.append("intercept", intercept.toString());
		const files: { ficheros_matrices: File[]; ficheros_plot: File[] } =
			this.#filesListService.getFiles();
		for (const fichero of files.ficheros_matrices) {
			if (fichero) {
				formData.append("matrices", fichero);
			}
		}
		for (const fichero of files.ficheros_plot) {
			if (fichero) {
				formData.append("plots", fichero);
			}
		}
		return this.#http.post<RegresionMultipleResponse>(
			`${environment.apiUrl}${endpoints.linear_regresion.concatenacion_plot}`,
			formData,
		);
	}
	enviarFicheroMat(file: File): Observable<string[]> {
		const formData = new FormData();
		formData.append("mat_file", file);
		return this.#http.post<string[]>(
			`${environment.apiUrl}${endpoints.linear_regresion.analizar_fichero_mat}`,
			formData,
		);
	}
	generarMatricesPrueba() {
		return this.#http.get(
			`${environment.apiUrl}${endpoints.linear_regresion.generar_matrices_prueba}`,
		);
	}
}
