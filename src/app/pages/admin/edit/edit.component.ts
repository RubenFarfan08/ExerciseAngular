import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from 'src/app/Model/model.model';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  title = 'Add Product';
  form: FormGroup;
  Product: Products = {
    id: 0,
    name: '',
    description: '',
    ageRestriction: 0,
    company: '',
    price: 0
  };
  update = false;
  idp = 0;
  name: any;
  description: any;
  age: any;
  company: any;
  price: any;
  constructor(
    private servicio: ApiService,
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
    ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      if (this.route.snapshot.paramMap.get('id')) {
        const id = this.route.snapshot.paramMap.get('id');
        this.idp = Number(id);
        this.update = true;
        this.title = 'Edit Product';
        this.servicio.GetProductById(Number(id)).subscribe((data) => {
          this.Product = data;
          console.log(this.Product);
          this.name = new FormControl(data.name, [Validators.required, Validators.maxLength(50)]);
          this.description = new FormControl(data.description, [Validators.required, Validators.maxLength(100)]);
          this.age = new FormControl(data.ageRestriction, [Validators.required, Validators.min(0), Validators.max(100)]);
          this.company = new FormControl(data.company, [Validators.required, Validators.maxLength(50)]);
          this.price = new FormControl(data.price, [Validators.required, Validators.min(1), Validators.max(1000)]);

          this.form = this.fb.group({
            name: this.name,
            description: this.description,
            age: this.age,
            company: this.company,
            price: this.price
          });
        });

      }else{
        console.log('create');
        this.name = new FormControl('', [Validators.required, Validators.maxLength(50)]);
        this.description = new FormControl('', [Validators.required, Validators.maxLength(100)]);
        this.age = new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]);
        this.company = new FormControl('', [Validators.required, Validators.maxLength(50)]);
        this.price = new FormControl(0, [Validators.required, Validators.min(1), Validators.max(1000)]);

        this.form = this.fb.group({
          name: this.name,
          description: this.description,
          age: this.age,
          company: this.company,
          price: this.price
        });
      }
    });



  }

  submitForm(){
    if (this.form.invalid) {
      Swal.fire('Error', 'llenar los campos requeridos.', 'error');
      return;
    }
    this.TomaDatos();
    if (this.update){
      this.servicio.PutProduct(this.Product).subscribe(data => {
        Swal.fire(
          'Good job!',
          'You updated a product',
          'success'
        );
        this.router.navigate(['main/Admin']);
      });
    } else{
      this.servicio.PostProduct(this.Product).subscribe(data => {
        Swal.fire(
          'Good job!',
          'You created a new product',
          'success'
        );
        this.router.navigate(['main/Admin']);
      });
    }
  }

  TomaDatos(){
    this.Product = {
      id: this.idp,
      name: this.form.get('name')?.value,
      description: this.form.get('description')?.value,
      ageRestriction: this.form.get('age')?.value,
      company: this.form.get('company')?.value,
      price: this.form.get('price')?.value
    };
  }


}
