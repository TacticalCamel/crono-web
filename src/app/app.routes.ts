import { Routes } from '@angular/router';
import {LoginComponent} from "./routes/login.component";
import {IndexComponent} from "./routes/index.component";
import {RegisterComponent} from "./routes/register.component";
import {PageNotFoundComponent} from "./routes/page-not-found.component";

export const routes: Routes = [
    {path: '', component: IndexComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: '**', component: PageNotFoundComponent},
];
