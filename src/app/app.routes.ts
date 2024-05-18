import {Routes} from '@angular/router';
import {redirectUnauthorizedTo, redirectLoggedInTo, AuthGuard} from '@angular/fire/auth-guard';

import {LoginComponent} from "./pages/login.component";
import {IndexComponent} from "./pages/index.component";
import {RegisterComponent} from "./pages/register.component";
import {ProfileComponent} from "./pages/profile.component";
import {ActivitiesComponent} from "./pages/activities.component";

const redirectLoggedInToHome = () => redirectLoggedInTo(['']);
const redirectLoggedOutToLogin = () => redirectUnauthorizedTo(['login']);

export const routes: Routes = [
    {path: '', component: IndexComponent},
    {path: 'login', component: LoginComponent, canActivate: [AuthGuard], data: {authGuardPipe: redirectLoggedInToHome}},
    {path: 'register', component: RegisterComponent, canActivate: [AuthGuard], data: {authGuardPipe: redirectLoggedInToHome}},
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: {authGuardPipe: redirectLoggedOutToLogin}},
    {path: 'activities', component: ActivitiesComponent, canActivate: [AuthGuard], data: {authGuardPipe: redirectLoggedOutToLogin}},
    {path: '**', redirectTo: ''},
];