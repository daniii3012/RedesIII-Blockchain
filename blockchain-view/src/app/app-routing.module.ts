import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { VoteComponent } from './pages/vote/vote.component';
import { AdminComponent } from './pages/admin/admin.component';


import { AuthGuard } from './guards/auth/auth.guard';
import { RoleGuard } from './guards/role/role.guard';



const routes: Routes = [
  { path: 'vote', component: VoteComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [RoleGuard]},
  { path: '', pathMatch: 'full', redirectTo: 'vote' },
  { path: '**', pathMatch: 'full', redirectTo: 'vote' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
