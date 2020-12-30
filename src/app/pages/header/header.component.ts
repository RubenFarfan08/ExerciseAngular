import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/Model/model.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAdmin = false;
  User: Users = null;
  constructor(private servicio: ApiService) { }


  ngOnInit(): void {
    this.servicio.MiPerfil().subscribe(z => {
      this.User = z;
      const roles = z.roles;
      if (roles.includes('Admin')) {
        this.isAdmin = true;
      }else{
        this.isAdmin = false;
      }
    });
  }

}
