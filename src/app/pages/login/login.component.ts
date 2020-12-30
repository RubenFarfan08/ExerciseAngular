import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginViewModel } from 'src/app/Model/model.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: LoginViewModel = {
    email: '',
    password: '',
    rememberMe: false
  };
  constructor(private servicio: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  async Login(fLogin: NgForm){
    if (fLogin.invalid){
      Swal.fire('Fill in the fields please.', 'Incomplete data', 'error');
      return;
    }
    Swal.fire({
      title: 'process information',
      timerProgressBar: true,
      allowOutsideClick: false,
      didOpen: async () => {
        Swal.showLoading();
        const valido = await this.servicio.login(this.user);
        Swal.close();
        if ( valido ){
          // this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true});
          Swal.fire(  'Good job!',
          'Signed in successfully!',
          'success');
          this.router.navigate(['main/Home']);
        }else{
         //
         Swal.fire('NOk');
        }
      },
      willClose: async () => {

      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer');
      }
    });
  }

}
