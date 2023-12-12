import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil, tap } from 'rxjs';
import { comparisonValidator } from 'src/app/infrastructure';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  public registrationForm: FormGroup;
  public responce: any;
  private builder = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private destroy$ = new Subject();

  constructor() { }

  ngOnInit() {
    this.registrationForm = this.builder.group({
      fullName: ['', [Validators.required]],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validators: [comparisonValidator()] });
    // this.registrationForm.setValidators(comparisonValidator())
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public registration() {
    this.authService.registration(this.registrationForm.value).pipe(
      takeUntil(this.destroy$),
    ).subscribe(responce => {
      // this.responce = responce;
      console.log(responce);
      
    })
  }

  public navigateToLogin() {
    this.router.navigate(['login']);
  }
}
