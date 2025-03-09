import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FileUploadViewerComponent } from '@app/components/file-upload-viewer..component';

@Component({
  selector: 'app-home',
  imports: [FileUploadViewerComponent],
  styles: [``],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <h1>Componentes para testar</h1>
      <div class="d-flex flex-row">
        <app-file-upload-viewer class="col-3"></app-file-upload-viewer
        ><app-file-upload-viewer class="col-3"></app-file-upload-viewer
        ><app-file-upload-viewer class="col-3"></app-file-upload-viewer
        ><app-file-upload-viewer class="col-3"></app-file-upload-viewer>
      </div>
    </div>
  `,
})
export class HomeComponent {
  constructor() {}

  ngOnInit(): void {
    // Initialization logic here
  }
}
