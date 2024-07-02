import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
// import { AuthService } from 'src/app/services';
// import { ILoginUser } from '../../infrastructure';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm: FormGroup;
  private builder = inject(FormBuilder);
  // private auth = inject(AuthService);
  private destroy$ = new Subject();
  private router = inject(Router);

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
    this.router.navigate(['article']);
    // this.auth.login(this.loginForm.value).pipe // to do error handling
    //   takeUntil(this.destroy$),
    // ).subscribe(() => {
    //   this.router.navigate(['article']);
    // })
  }
}
