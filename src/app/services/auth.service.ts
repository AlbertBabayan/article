import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILoginUser, IRegUser } from '../infrastructure';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }

  public registration(userData: IRegUser): Observable<IRegUser> {
    const {fullName, confirmPassword, ...rest} = userData;
    const payload = {
      phone: '0123456789',
      name: fullName,
      password_confirmation: confirmPassword,
      ...rest
    }
    
    const {prod, serverUrl} = environment;
    return this.http.post<IRegUser>(`${serverUrl}/api/register`, payload);
  }

  public login(payload: ILoginUser): Observable<ILoginUser> {
    const {serverUrl} = environment;
    return this.http.post<ILoginUser>(`${serverUrl}/api/login`, payload)
    .pipe(
      tap(
        resp => {
          localStorage.setItem('authToken', '111');
        }
      )
    )
  }
}
