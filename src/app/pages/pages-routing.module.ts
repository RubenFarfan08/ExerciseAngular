import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioGuard } from 'src/app/guards/usuario.guard';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'Home',
        loadChildren: () =>
        import('./home/home.module').then(
          (m) => m.HomeModule
        )
      },
      {
        path: 'Auth',
        loadChildren: () =>
          import('./login/login.module').then(
            (m) => m.LoginModule
          )
      },
      {
        path: 'Admin',
        loadChildren: () =>
          import('./admin/admin.module').then(
            (m) => m.AdminModule
          ),
        canLoad: [UsuarioGuard],
      }
    ]
  },
  {
    path: '',
    redirectTo: '/main/Home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
