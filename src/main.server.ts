import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import '../public/assets/polyfills/localstorage-polyfill';
import '../public/assets/polyfills/sessionstorage-polyfill';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
