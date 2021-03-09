import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take, map, tap } from 'rxjs/operators';
import { throwError, of, Observable, BehaviorSubject, Subject, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppError } from '../errors/app-error';
import { UserExitsError } from '../errors/user-exits-error';
import { WrongCredentialError } from '../errors/wrong-crendential-error';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'shared/models/user.model';
import { environment } from 'src/environments/environment';

interface EmailPassword {
  email: string;
  password: string;
}

interface LoginResponse {
  id: string;
  email: string;
  role: string;
  accessToken: string;
  refreshToken: string;
}

interface ResetPassword {
  currentPassword: string,
  newPassword: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly BASE_URL = `${environment.baseUrl}auth/`;
  readonly JWT_TOKEN = 'JWT_TOKEN';
  readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  // Set to Undefined to check in the Guard when refresh the page
  user$: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.getUser().subscribe(user => { this.user$.next(user as User); });
  }

  getUser() {
    return this.http.get(this.BASE_URL).pipe(
      catchError((error: Response) => {
      return of(null);
    }), map(user => {
      return user;
    }));
  }

  signup(emailPassword: EmailPassword) {
    return this.http.post(this.BASE_URL + 'signup', emailPassword).
      pipe(take(1),
        catchError((error: Response) => {
          if (error.status === 403) {
            return throwError(new UserExitsError());
          }
          return throwError(new AppError(error));
        }));
  }

  login(emailPassword: EmailPassword) {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/products';

    return this.http.post(this.BASE_URL + 'login', emailPassword).
      pipe(take(1), map((token: LoginResponse) => {
        localStorage.setItem(this.JWT_TOKEN, token.accessToken);
        localStorage.setItem(this.REFRESH_TOKEN, token.refreshToken);
        this.user$.next({ id: token.id, email: token.email, role: token.role });
        this.router.navigate([returnUrl]);
      }),
        catchError((error: Response) => {
          if (error.status === 403) {
            return throwError(new WrongCredentialError());
          }
          return throwError(new AppError(error));
        }));
  }

  resetPassword(resetPassword: ResetPassword ){
    return this.http.put(this.BASE_URL + 'resetPassword', resetPassword).
      pipe(take(1), map((token: LoginResponse) => {
        // localStorage.setItem(this.JWT_TOKEN, token.accessToken);
        // localStorage.setItem(this.REFRESH_TOKEN, token.refreshToken);
        // this.user$.next({ id: token.id, email: token.email, role: token.role });
      }),
        catchError((error: Response) => {
          if (error.status === 403) {
            return throwError(new WrongCredentialError());
          }
          return throwError(new AppError(error));
        }));
  }

  forgotPassword( email: string){
    return this.http.put(this.BASE_URL + 'forgotPassword', {email}).
      pipe(take(1), map((resp: any) => {
        return resp;
      }),
        catchError((error: Response) => {
          if (error.status === 403) {
            return throwError(new WrongCredentialError());
          }
          return throwError(new AppError(error));
        }));
  }

  forgotPasswordToken(email: string, newPassword: string, forgotPasswordToken: string) {
    return this.http.put(this.BASE_URL + 'forgotPasswordToken', {email, newPassword, forgotPasswordToken}).
      pipe(take(1), map((resp: any) => {
        return resp;
      }),
        catchError((error: Response) => {
          if (error.status === 403 || error.status === 401) {
            return throwError(new WrongCredentialError());
          }
          return throwError(new AppError(error));
        }));
  }

  refreshToken() {
    const refreshToken = localStorage.getItem(this.REFRESH_TOKEN);

    return this.http.post(this.BASE_URL + 'refresh-token', { refreshToken }).
      pipe(take(1), tap((token: { accessToken: string }) => {
        localStorage.setItem(this.JWT_TOKEN, token.accessToken);
      }));
  }

  get getStoredToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  async logOut() {
    const refreshToken = localStorage.getItem(this.REFRESH_TOKEN);
    this.http.delete(this.BASE_URL + refreshToken).pipe(
      catchError((error: Response) => {
        return throwError(new AppError(error));
      }))
    .subscribe();

    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    this.user$.next(null);
  }
}
