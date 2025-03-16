import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { FilesListService } from '@services/internal/files-list.service';
import { endpoints } from 'endpoints';
import { environment } from 'environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FicheroService {
  #filesListService = inject(FilesListService);
  constructor(private readonly http: HttpClient) {}

  ejecutarRegresionLinealMultiplesFicherosConcatenados(
    test_size: number | undefined,
    train_size: number | undefined,
    random_state: number | undefined,
    shuffle: boolean | undefined,
    stratify: string | undefined,
    intercept: boolean | undefined,
    method: string | undefined,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Observable<any> {
    const formData = new FormData();
    if (test_size) formData.append('test_size', test_size.toString());
    if (train_size) formData.append('train_size', train_size.toString());
    if (random_state) formData.append('random_state', random_state.toString());
    if (shuffle) formData.append('shuffle', shuffle.toString());
    if (stratify) formData.append('stratify', stratify.toString());
    if (intercept) formData.append('intercept', intercept.toString());
    if (method) formData.append('method', method);

    const files: { ficheros_matrices: File[]; ficheros_plot: File[] } =
      this.#filesListService.getFiles();

    files.ficheros_matrices.forEach((fichero: File) => {
      if (fichero) {
        formData.append('matrices', fichero);
      }
    });

    files.ficheros_plot.forEach((fichero: File) => {
      if (fichero) {
        formData.append('plots', fichero);
      }
    });
    console.log('Enviando formdata ', formData);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.http.post<any>(
      `${environment.apiUrl}${endpoints.linear_regresion.concatenacion_plot}`,
      formData,
    );
  }

  enviarFicheroMat(file: File): Observable<string[]> {
    const formData = new FormData();
    formData.append('mat_file', file);
    return this.http.post<string[]>(
      `${environment.apiUrl}${endpoints.linear_regresion.analizar_fichero_mat}`,
      formData,
    );
  }
}
