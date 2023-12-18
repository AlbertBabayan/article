import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from 'src/app/public/services';

@Injectable({
  providedIn: 'root'
})
export class ActivateArticleGuard implements CanActivate {

  constructor(
    private authSvc: AuthService,
  ) {}

  canActivate(): boolean {
    if(this.authSvc.isSingedIn()) {
      return true;
    }
    return false;
  }
  
}
