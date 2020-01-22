import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 @Output() cancelRegister = new EventEmitter();
 model: any = {}; // empty object

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  register() {
   this.authService.register(this.model).subscribe( () => {
     this.alertify.success('egistration  successfully');
   }, error => {
      this.alertify.error(error);
    });
  }

  logout() {
    this.alertify.success('loggedout');
  }

  cancel() {
    this.cancelRegister.emit(false); // In this boolean value is emited to parent component
  }
}
