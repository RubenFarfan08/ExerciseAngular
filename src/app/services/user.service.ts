import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import {
  ChangePaswordViewModel,
  LoginViewModel,
  RegisterViewModel,
  UserManagerResponse,
} from '../Model/model.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  Token: string = null;
  api = environment.api;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('Token')}`,
  });
  constructor(private http: HttpClient, private router: Router) {}

  login(user: LoginViewModel) {
    return new Promise((resolve) => {
      return this.http
        .post<UserManagerResponse>(this.api + 'auth/Login', user)
        .pipe(catchError(this.handleError))
        .subscribe(
          async (resp) => {
            if (resp.isSuccess) {
              await this.guardarToken(resp.message);
              resolve(true);
            } else {
              this.Token = null;
              localStorage.clear();
              resolve(false);
            }
          },
          (er) => {
            resolve(false);
          }
        );
    });
  }

  RegisterAsync(user: RegisterViewModel): Observable<any> {
    return this.http
      .post<UserManagerResponse>(this.api + 'auth/Register', user).pipe(
        catchError((err) => {
          return throwError(err.error.errors);    // Rethrow it back to component
        })
      )
  }

  handleError(er: HttpErrorResponse) {
    return throwError(er);
  }

  async guardarToken(token: string) {
    this.Token = token;
    localStorage.setItem('Token', token);
  }

  async getToken() {
    this.Token = localStorage.getItem('Token');
    return this.Token;
  }

  async validaToken(): Promise<boolean> {
    await this.getToken();
    if (!this.Token) {
      this.router.navigate(['/login']);
      return Promise.resolve(false);
    }
  }

  cerrar(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  ChangePassword(
    change: ChangePaswordViewModel
  ): Observable<UserManagerResponse> {
    return this.http.post<UserManagerResponse>(
      this.api + 'auth/ChangePassword',
      change,
      { headers: this.headers }
    );
  }
}
