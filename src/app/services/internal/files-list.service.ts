import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilesListService {
  private readonly ficheros_matrices: File[] = [];
  private readonly ficheros_plot: File[] = [];

  eliminarUltimoFicheroMatriz() {
    this.ficheros_matrices.pop();
  }
  eliminarUltimoFicheroPlot() {
    this.ficheros_plot.pop();
  }

  setFicheroMatriz(fichero: File): void {
    if (fichero) this.ficheros_matrices.push(fichero);
  }
  setFicheroPlot(fichero: File): void {
    if (fichero) this.ficheros_plot.push(fichero);
  }

  getFiles() {
    return {
      ficheros_matrices: this.ficheros_matrices,
      ficheros_plot: this.ficheros_plot,
    };
  }
}
