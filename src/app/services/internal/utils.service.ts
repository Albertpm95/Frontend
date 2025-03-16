import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public flattenHttpErrorResponse(obj: Record<string, any>, prefix: string = '') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: { [key: string]: any } = {};

    for (const key in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(key)) {
        const newKey = prefix ? `${prefix}.${key} ` : key;

        if (typeof obj[key] === 'object' && obj[key] !== null) {
          // Si el valor es un objeto, lo aplanamos recursivamente
          Object.assign(result, this.flattenHttpErrorResponse(obj[key], newKey));
        } else if (typeof obj[key] != 'function') {
          // Si el valor no es un objeto, lo asignamos directamente
          result[newKey] = obj[key];
        }
      }
    }

    return result;
  }
}
