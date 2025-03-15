// services/fichero.service.ts
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Fichero } from '@interfaces/ficheros.interface';
import { FilesListService } from '@services/internal/files-list.service';
import { endpoints } from 'endpoints';
import { environment } from 'environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FicheroService {
  #filesListService = inject(FilesListService);
  constructor(private readonly http: HttpClient) {}

  ejecutarRegresionLinealMultiplesFicherosConcatenados(): Observable<unknown> {
    const formData = new FormData();
    const files = this.#filesListService.getFiles();

    // Añadir archivos de matrices con un prefijo claro
    files.ficheros_matrices.forEach((file: Fichero, index: number) => {
      formData.append(`matrices_file_${index}`, file, file.name);
    });

    // Añadir archivos de plot con un prefijo claro
    files.ficheros_plot.forEach((file: Fichero, index: number) => {
      formData.append(`plot_file_${index}`, file, file.name);
    });

    return this.http
      .post(
        `${environment.apiUrl}${endpoints.linear_regresion.concatenacion_plot}`,
        formData,
      )
      .pipe(
        catchError((error) => {
          console.error('Error al ejecutar la regresión lineal:', error);
          return throwError('Error al procesar los archivos.');
        }),
      );
  }
}
