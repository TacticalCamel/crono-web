import { Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {IndexComponent} from "./pages/index/index.component";
import {RegisterComponent} from "./pages/register/register.component";
import {PageNotFoundComponent} from "./pages/shared/page-not-found.component";

export const routes: Routes = [
    {path: '', component: IndexComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: '**', component: PageNotFoundComponent},
];
