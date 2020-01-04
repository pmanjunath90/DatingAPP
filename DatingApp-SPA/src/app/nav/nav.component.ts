import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(private authService: AuthService ) {

  }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
        console.log('logged in successfuly');
      },
      error => {
          console.log('Error in login');
        }
    );
  }

  loggedIn() {
    const token = localStorage.getItem('token');

    return !!token; // "!!" --> (same as if condition for
          // null check ) this means if anything is there in Tokne then it will return TRUE else False
  }

  logout() {
    localStorage.removeItem('token');
    console.log('Logged out');
  }

}