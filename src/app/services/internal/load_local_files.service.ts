import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadLocalFilesService {
  constructor() {}

  loadTxtFile(file: File): Observable<string> {
    const fileReader = new FileReader();
    const fileObservable = new Observable<string>((observer) => {
      fileReader.onload = () => {
        observer.next(fileReader.result as string);
        observer.complete();
      };
      fileReader.onerror = (error) => {
        observer.error(error);
      };
    });

    fileReader.readAsText(file);
    return fileObservable;
  }
}
