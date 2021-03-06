import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
registermode = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  registerTogle() {
    this.registermode = true;
  }

  cancelRegisterMode(registerMode: boolean) {
    this.registermode = registerMode;
  }
}
