import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-visor-imagen',
  imports: [CommonModule],
  template: `<img [src]="imageData()" alt="Gráfica de regresión" /> `,
})
export class VisorImagenComponent {
  imageData = input.required<string>();
}
