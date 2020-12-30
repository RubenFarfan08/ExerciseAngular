import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { Users } from '../Model/model.model';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanLoad {
  User: Users = null;
  constructor(private servicio: ApiService){}
  isAdmin(){
    return new Promise<boolean>((resolve) => {
      return     this.servicio.MiPerfil().subscribe(async z => {
        this.User = z;
        const roles = z.roles;
        if (roles.includes('Admin')) {
          resolve(true);
        }else{
          resolve(false);
        }
      });
    });

   }

  canLoad(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.isAdmin();
  }


  // tslint:disable-next-line:typedef

}
