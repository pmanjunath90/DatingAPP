import { Component, OnInit } from "@angular/core";
import { UserService } from "../../_services/User.service";
import { AlertifyService } from "../../_services/alertify.service";
import { User } from "../../_models/User";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-MemberList",
  templateUrl: './MemberList.component.html',
  styleUrls: ['./MemberList.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];
  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe( data=> {
      this.users = data['users'];
    });
  }

  // loadUsers() {
  //   this.userService.getUsers().subscribe(
  //     (users: User[]) => {        
  //       this.users = users;
  //     }, error => {
  //       this.alertify.error('t2');
  //       this.alertify.error(error);
  //     });
  // }
}
