import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path: '', redirectTo: 'home-page', pathMatch: 'full'},
  {path: 'home-page', component: HomePageComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
