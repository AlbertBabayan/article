import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './public/services';
import { PublicModule } from './public/public.module';
import { ArticleModule } from './article/article.module';

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
    JwtModule.forRoot({
      config: {
        allowedDomains: [environment.serverDomain],
        disallowedRoutes: [
          `${environment.serverDomain}/home-page`,
          `${environment.serverDomain}/registration`,
          `${environment.serverDomain}/login`
        ],
        tokenGetter: AuthService.getToken,
        skipWhenExpired: true,
        throwNoTokenError: true
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
