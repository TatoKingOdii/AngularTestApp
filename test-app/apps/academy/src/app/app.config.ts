import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import {provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {loggingInterceptor} from "@test-app/core-data";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes),
    provideAnimations(),
    provideHttpClient(withFetch(), withInterceptors([loggingInterceptor]))
  ],
};
