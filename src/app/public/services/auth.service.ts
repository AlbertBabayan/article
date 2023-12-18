import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILoginUser, IRegUser } from '../infrastructure';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
  ) { }

  public static getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  public isSingedIn(): boolean {
    return AuthService.getToken() && !this.jwtHelper.isTokenExpired(AuthService.getToken());
  }

  public registration(userData: IRegUser): Observable<Partial<IRegUser>> {
    const {fullName, confirmPassword, ...rest} = userData;
    const payload = {
      phone: '0123456789',
      name: fullName,
      password_confirmation: confirmPassword,
      ...rest
    }
    
    const {prod, serverUrl} = environment;
    return this.http.post<Partial<IRegUser>>(`${serverUrl}/api/register`, payload);
  }

  public login(payload: ILoginUser): Observable<ILoginUser> {
    const {serverUrl} = environment;
    return this.http.post<ILoginUser>(`${serverUrl}/api/login`, payload)
    .pipe(
      tap(
        resp => {
          localStorage.setItem('authToken', resp.token);
        }
      )
    )
  }
}
