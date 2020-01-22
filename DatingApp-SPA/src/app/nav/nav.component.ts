import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(public authService: AuthService, private alertify: AlertifyService) {

  }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('logged in successfuly');
      },
      error => {
        this.alertify.error('Error in login');
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
    this.alertify.message('Logged out');
  }

}
