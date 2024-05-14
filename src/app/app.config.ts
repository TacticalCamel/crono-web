// firebase
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getDatabase, provideDatabase} from '@angular/fire/database';
import {getFirestore, provideFirestore} from "@angular/fire/firestore";

// angular
import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

const firebaseConfig = {
    apiKey: "AIzaSyAdPYsq8f7LxMy-1OuQ0foRKvJDal2LBMI",
    authDomain: "crono-web.firebaseapp.com",
    databaseURL: "https://crono-web-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "crono-web",
    storageBucket: "crono-web.appspot.com",
    messagingSenderId: "728039363919",
    appId: "1:728039363919:web:bc1888fefd44f8d1ad213a"
};

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideAuth(() => getAuth()),
        provideDatabase(() => getDatabase()),
        provideFirestore(() => getFirestore()),
        provideFirebaseApp(() => initializeApp(firebaseConfig)),
        provideAnimationsAsync()
    ]
};
