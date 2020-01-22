import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DatingApp-SPA';
  jwtHelper = new JwtHelperService();

  constructor(private authservice: AuthService){}

  // on refresh we need to show loged in user name for localstored token
  ngOnInit(){
    const token = localStorage.getItem('token');
    this.authservice.decodedToken = this.jwtHelper.decodeToken(token);
  }
}
