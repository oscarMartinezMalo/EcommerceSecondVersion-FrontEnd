import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { HttpErrorService } from '../../shared/errors/http-error.service';
import { ToastService } from 'shared/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate  {

  constructor(
    private authService: AuthService,
    private router: Router,
    private httpErrorService: HttpErrorService,
    private toastService: ToastService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    return this.authService.getUser().pipe(map(user => {
      if (user.role === 'Admin') { return true; }

      this.router.navigate(['/products']);

      this.toastService.show('You don\'t have enough privileges to perform this operation.',
       { classname: 'bg-danger text-light', delay: 1000 });

      return false;
    }));
  }
}
