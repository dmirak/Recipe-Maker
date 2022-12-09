import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { defineCustomElements } from '@ionic/pwa-elements/loader';

if (environment.production) {
  try {
    enableProdMode();
  } catch (exception) {
    console.error('BUGFIX: calling isDevMode() in imports before enableProdMode() throws exception - https://github.com/angular/angular-cli/issues/8340#\n', exception);
  }
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

defineCustomElements(window);
