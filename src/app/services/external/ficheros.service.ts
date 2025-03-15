import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RespuestaRegresionConcatenadaPlot } from '@interfaces/datos-directos.interface';
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
  ejecutarRegresionLinealMultiplesFicherosConcatenados(): Observable<RespuestaRegresionConcatenadaPlot> {
    const formData = new FormData();
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

    return this.http.post(
      `${environment.apiUrl}${endpoints.linear_regresion.concatenacion_plot}`,
      formData,
    ) as Observable<RespuestaRegresionConcatenadaPlot>;
  }
}
