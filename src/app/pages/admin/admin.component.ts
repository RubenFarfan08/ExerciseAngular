import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Products } from 'src/app/Model/model.model';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  Products: Products[] = [];
  constructor(private servicio: ApiService){}

  ngOnInit(): void {
    this.servicio.GetProducts().subscribe(data => {
      this.Products = data;
    });
  }

  delete(item: Products){
    Swal.fire({
      title: 'Are you sure to delete this product?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.servicio.DeleteProduct(item.id).subscribe(
          (response) => {                           // Next callback
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
            this.removeItemFromArr(this.Products, item);
          },
          (error) => {                              // Error callback
            Swal.fire(
              'Error!',
              JSON.stringify(error) + '',
              'error'
            );
            // throw error;   //You can also throw the error to a global error handler
          });


      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          '',
          'error'
        );
      }
    });
  }



  removeItemFromArr(arr, item) {
    const i = arr.indexOf(item);
    if (i !== -1) {
      arr.splice(i, 1);
    }
  }

}
