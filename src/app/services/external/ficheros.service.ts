// services/fichero.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatosDirectos } from '@interfaces/datos-directos.interface';
import { FicheroSubido } from '@interfaces/ficheros-subidos.interface';
import { endpoints, environment } from 'environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FicheroService {
  constructor(private readonly http: HttpClient) {}

  obtenerFicheros(): Observable<FicheroSubido[]> {
    return this.http.get<FicheroSubido[]>(
      `${environment.apiUrl + endpoints.utils.files.list}`
    );
  }

  enviarListaFicherosProcesar(
    listaFicherosServidorSeleccionados: FicheroSubido[]
  ) {
    return this.http.post(``, listaFicherosServidorSeleccionados);
  }

  ejecutarRegresionDatosDirectos(datos_directos: DatosDirectos) {
    const url = `${environment.apiUrl + endpoints.regression.regression}`;
    return this.http.post(url, datos_directos);
  }
  ejecutarLinearRegresion() {
    return this.http.get(
      `${
        environment.apiUrl +
        endpoints.linear_regresion.uploadYEjecutarLinearRegresion
      }`
    );
  }
  ejecutarNNLinearRegresion() {
    return this.http.get(
      `${
        environment.apiUrl +
        endpoints.non_negative_linear_regression.non_negative_linear_regression
      }`
    );
  }
}
