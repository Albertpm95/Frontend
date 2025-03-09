import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FileUploadViewerComponent } from '@app/components/file-upload-viewer..component';

@Component({
  selector: 'app-home',
  imports: [FileUploadViewerComponent],
  styles: [``],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex space-x-4">
      <app-file-upload-viewer class="flex-1"></app-file-upload-viewer>
      <app-file-upload-viewer class="flex-1"></app-file-upload-viewer>
      <app-file-upload-viewer class="flex-1"></app-file-upload-viewer>
    </div>
  `,
})
export class HomeComponent {
  constructor() {}
}
