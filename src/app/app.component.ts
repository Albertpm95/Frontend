import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  standalone: true,
  template: `<div class="vista-principal"><router-outlet /></div>`,
  styles: [
    `
      vista-principal {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }
    `,
  ],
})
export class AppComponent {
  title = 'Frontend';
}
