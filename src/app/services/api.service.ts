import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Products, Users } from '../Model/model.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  api = environment.api;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('Token')}`,
  });
  constructor(private http: HttpClient) { }

  MiPerfil(): Observable<Users> {
    return this.http.get<Users>(this.api + 'auth/GetMyUser', {
      headers: this.headers,
    });
  }

  GetProducts(): Observable<Products[]>{
    return this.http.get<Products[]>(this.api + 'Products');
  }

  GetProductById(id: number): Observable<Products>{
    return this.http.get<Products>(this.api + 'Products/' + id);
  }

  PostProduct(product: Products): Observable<Products>{
    return this.http.post<Products>(this.api + 'Products', product, {headers: this.headers});
  }

  PutProduct(product: Products): Observable<Products> {
    return this.http.put<Products>(this.api + 'Products/' + product.id, product, {headers: this.headers} );
  }

  DeleteProduct(id: number): Observable<Products>{
    return this.http.delete<Products>(this.api + 'Products/' + id, {headers: this.headers} );
  }

}
