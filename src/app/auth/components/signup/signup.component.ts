import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { AppError } from 'src/app/shared/errors/app-error';
import { UserExitsError } from 'src/app/shared/errors/user-exits-error';
import { forbiddenNameValidator } from '../../../shared/services/customValidator.directive';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm = this.fb.group({
    email: ['', [Validators.required, forbiddenNameValidator()]],
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
    this.signupForm.get('password').markAsTouched();
    this.signupForm.markAllAsTouched();

    if (this.signupForm.valid && this.signupForm.touched) {
      const email = this.signupForm.get('email').value.trim();
      const password = this.signupForm.get('password').value;
      this.authService.signup({ email, password })
        .subscribe(resp => {
          this.router.navigate(['/login']);
        },
          (error: AppError) => {
            if (error instanceof UserExitsError) {
              this.signupForm.setErrors({ accountExit: true });
            } else { throw error; }
          });
    }
  }
}
