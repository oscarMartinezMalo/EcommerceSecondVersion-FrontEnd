import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { HttpErrorService } from '../../shared/errors/http-error.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate  {

  constructor(
    private authService: AuthService,
    private router: Router,
    private httpErrorService: HttpErrorService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    return this.authService.getUser().pipe(map(user => {
      if (user.role === 'Admin') { return true; }
      return false;
    }));
  }
}
