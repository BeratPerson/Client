import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  public jwtHelper: JwtHelperService = new JwtHelperService();

  public isExpanded = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  collapse() {
    console.log(this.isExpanded)
    this.isExpanded = false;
  }

  toggle() {
    console.log(this.isExpanded)
    this.isExpanded = !this.isExpanded;
  }

  isUserAuthenticated() {
    const token: string | null = localStorage.getItem("accessToken");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }

  public logOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    this.router.navigate(["login"]);
  }
}