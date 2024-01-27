import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from "primeng/button";
import { AuthService } from './services';



@NgModule({
  declarations: [
    HomePageComponent,
    RegistrationComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    ReactiveFormsModule,
    ButtonModule,
  ],
  providers: [
    AuthService,
  ],
})
export class PublicModule { }
