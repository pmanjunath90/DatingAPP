import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 @Output() cancelRegister = new EventEmitter();
 model: any = {}; // empty object

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  register() {
   this.authService.register(this.model).subscribe( () => {
     console.log('registration  successfully');
   }, error => {
      console.log(error);
    });
  }

  logout() {
    console.log('loggedout');
  }

  cancel() {
    console.log('reg cancel clicked');
    this.cancelRegister.emit(false); // In this boolean value is emited to parent component
  }
}