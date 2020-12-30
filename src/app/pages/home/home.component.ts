import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/Model/model.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Products: Products[] = [];
  constructor(private servicio: ApiService) { }

  ngOnInit(): void {
    this.servicio.GetProducts().subscribe(data => {
      this.Products = data;
    });
  }

}
