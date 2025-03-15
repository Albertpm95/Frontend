import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadLocalFilesService {
  loadTxtFile(file: File): Observable<string> {
    const fileReader = new FileReader();
    const fileObservable = new Observable<string>((observer) => {
      fileReader.onload = () => {
        let content = fileReader.result as string;
        content = content.replace(/,/g, ', ');
        observer.next(content);
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
