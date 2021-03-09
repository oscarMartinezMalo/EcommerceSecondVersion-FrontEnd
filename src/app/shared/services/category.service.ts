import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, take } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AppError } from 'shared/errors/app-error';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  readonly BASE_URL = `${environment.baseUrl}categories`;

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get(this.BASE_URL).
      pipe(take(1),
        catchError((error: Response) => {
          return throwError(new AppError(error));
        }));
  }
}
