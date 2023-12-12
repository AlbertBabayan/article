import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ILoginUser } from 'src/app/infrastructure';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm: FormGroup;
  public loginedUser: ILoginUser;
  private builder = inject(FormBuilder);
  private auth = inject(AuthService);
  private destroy$ = new Subject();

  constructor() { }

  ngOnInit() {
    this.loginForm = this.builder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    },);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public login() {
    this.auth.login(this.loginForm.value).pipe(
      takeUntil(this.destroy$),
    ).subscribe(resp => {
      debugger;
      this.loginedUser = resp;
    })
  }
}
