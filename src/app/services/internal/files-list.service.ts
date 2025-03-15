import { Injectable } from '@angular/core';
import { Fichero } from '@interfaces/ficheros.interface';

@Injectable({
  providedIn: 'root',
})
export class FilesListService {
  private ficheros_matrices: Fichero[] = [];
  private ficheros_plot: Fichero[] = [];

  getFiles() {
    return {
      ficheros_matrices: this.ficheros_matrices,
      ficheros_plot: this.ficheros_plot,
    };
  }

  addFicheroMatriz(fichero: Fichero): void {
    this.ficheros_matrices.push(fichero);
  }

  removeFicheroMatriz(fichero: Fichero): void {
    this.ficheros_matrices = this.ficheros_matrices.filter((f) => f !== fichero);
  }

  addFicheroPlot(fichero: Fichero): void {
    this.ficheros_plot.push(fichero);
  }

  removeFicheroPlot(fichero: Fichero): void {
    this.ficheros_plot = this.ficheros_plot.filter((f) => f !== fichero);
  }
}
