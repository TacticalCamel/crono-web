import {Routes} from '@angular/router';
import {redirectUnauthorizedTo, redirectLoggedInTo, AuthGuard} from '@angular/fire/auth-guard';

import {LoginComponent} from "./pages/login.component";
import {TimelineComponent} from "./pages/timeline.component";
import {RegisterComponent} from "./pages/register.component";
import {ActivitiesComponent} from "./pages/activities.component";

const redirectLoggedInToHome = () => redirectLoggedInTo(['']);
const redirectLoggedOutToLogin = () => redirectUnauthorizedTo(['login']);

// TODO min 4 route, min 2 le is van védve
export const routes: Routes = [
    {path: 'login', component: LoginComponent, canActivate: [AuthGuard], data: {authGuardPipe: redirectLoggedInToHome}},
    {path: 'register', component: RegisterComponent, canActivate: [AuthGuard], data: {authGuardPipe: redirectLoggedInToHome}},
    {path: 'timeline', component: TimelineComponent, canActivate: [AuthGuard], data: {authGuardPipe: redirectLoggedOutToLogin}},
    {path: 'activities', component: ActivitiesComponent, canActivate: [AuthGuard], data: {authGuardPipe: redirectLoggedOutToLogin}},
    {path: '', redirectTo: 'timeline', pathMatch: 'full'},
    {path: '**', redirectTo: ''},
];