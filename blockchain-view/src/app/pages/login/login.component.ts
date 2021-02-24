import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  logging: boolean;

  constructor(public auth: AuthService) { 
    this.email = '';
    this.password = '';
    this.logging = false;
  }

  ngOnInit() {
    
  }

  isLogging(){
    this.logging = !this.logging
  }

}
