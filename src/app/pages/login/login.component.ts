import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public invalidLogin: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  public login = (user: User) => {
    this.userService.login(user);
  }
}