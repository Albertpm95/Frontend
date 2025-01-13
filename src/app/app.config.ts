import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import Aura from '@primeng/themes/aura';
import { FicheroEffects } from '@state/ficheros/ficheros.effects';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { ficheroReducer } from './state/ficheros/ficheros.reducer';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ ficheros: ficheroReducer }),
    provideEffects(FicheroEffects),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
  ],
};
