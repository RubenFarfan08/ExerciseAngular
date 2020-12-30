import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterViewModel } from 'src/app/Model/model.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  Loginregistro: RegisterViewModel = {
    email: '',
    userName: '',
    password: '',
    confirmPassword: '',
  };
  constructor(private servicio: UserService, private router: Router ) { }

  ngOnInit(): void {
  }

  registro(fregistro: NgForm){

    if (fregistro.invalid){
      return;
    }
    Swal.fire({
      title: 'Are you sure?',
      text: 'you are sure to register with that data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.servicio.RegisterAsync(this.Loginregistro).subscribe(
          (response) => {                           // Next callback
            Swal.fire(
              'Good Job!',
              JSON.stringify(response.message) + '',
              'success'
            );
            this.router.navigate(['Auth/Login']);
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

}
