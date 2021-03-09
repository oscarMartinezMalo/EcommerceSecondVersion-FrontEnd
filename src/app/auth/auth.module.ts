import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmValidatorDirective } from './components/confirm-validator.directive';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ForgotPasswordTokenComponent } from './components/forgot-password-token/forgot-password-token.component';



@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ConfirmValidatorDirective,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    ForgotPasswordTokenComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'reset-password', component: ResetPasswordComponent, canActivate: [AuthGuard] },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'forgot-password-token/:token', component: ForgotPasswordTokenComponent }
    ])
  ]
})
export class AuthModule { }