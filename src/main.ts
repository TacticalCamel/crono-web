import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {AppRootComponent} from './app/pages/shared/app-root.component';

bootstrapApplication(AppRootComponent, appConfig).catch((err) => console.error(err));

// TODO 1,2:
//  fordítási és futtatási hiba nincs, ha mégis akkor az skill issue

// TODO 3:
//  nyilván van firebase hosting url