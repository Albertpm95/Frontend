import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  standalone: true,
  template: ` <div class="min-h-screen h-screen"><router-outlet /></div> `,
})
export class AppComponent {
  title = 'Frontend';
}
