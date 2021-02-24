import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userRole: any;

  constructor(
    public auth: AuthService, 
    private router: Router) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.auth.afAuth.authState.subscribe(
      auth => {
        if (auth) {
          this.auth.getUserRole(auth.uid).subscribe(
            userRole => {
              if(userRole){
                if (Object.assign({}, userRole).hasOwnProperty('role')) {
                  this.userRole = userRole.role;
                } else {
                  this.userRole = 'user';
                }
              }
            }
          )
        }
      }
    )
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }


}
