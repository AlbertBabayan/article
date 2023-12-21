import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from 'src/app/public/services';

@Injectable({
  providedIn: 'root'
})
export class ActivateArticleGuard implements CanActivate {

  constructor(
    private authSvc: AuthService,
  ) { }

  canActivate(): boolean {
    return this.authSvc.isSingedIn ? true : false;
  }

}
