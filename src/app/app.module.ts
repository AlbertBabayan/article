import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PublicModule } from './public/public.module';
import { ArticleModule } from './article/article.module';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ArticleResolver } from './resovers/article.resolver';
import { AuthService } from './services';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    PublicModule,
    ArticleModule,
  ],
  providers: [
    AuthService,
    ArticleResolver,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
