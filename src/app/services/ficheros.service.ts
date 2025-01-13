// services/fichero.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}
