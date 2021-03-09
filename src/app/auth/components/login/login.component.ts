import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { forbiddenNameValidator } from '../../../shared/services/customValidator.directive';
import { Router } from '@angular/router';
import { AppError } from 'src/app/shared/errors/app-error';
import { WrongCredentialError } from 'src/app/shared/errors/wrong-crendential-error';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signinForm = this.fb.group({
    email: ['', [Validators.required, , forbiddenNameValidator()]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.signinForm.get('password').markAsTouched();
    this.signinForm.markAllAsTouched();

    if (this.signinForm.valid && this.signinForm.touched) {
      const email = this.signinForm.get('email').value.trim();
      const password = this.signinForm.get('password').value;
      this.authService.login({ email, password })
        .subscribe(resp => {
        },
        (error: AppError) => {
          if (error instanceof WrongCredentialError) {
            this.signinForm.setErrors({ userPass: true });
          } else { throw error; }
        });
    }
  }

}
