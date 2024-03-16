import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getDatabase, provideDatabase} from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(provideFirebaseApp(() => initializeApp({
    "projectId": "crono-web",
    "appId": "1:619774498203:web:53a8887acf30108e087d3e",
    "databaseURL": "https://crono-web-default-rtdb.europe-west1.firebasedatabase.app",
    "storageBucket": "crono-web.appspot.com",
    "apiKey": "AIzaSyC7z5joyytOavCG7eHduZGazwHNIKD0tZU",
    "authDomain": "crono-web.firebaseapp.com",
    "messagingSenderId": "619774498203"
  }))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideDatabase(() => getDatabase()))]
};
