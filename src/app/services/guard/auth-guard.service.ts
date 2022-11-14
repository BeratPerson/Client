import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotificationService } from '../notification.service';
import { UserService } from '../user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  public jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private router: Router, private http: HttpClient, private notification: NotificationService, private userService: UserService) {
  }
  async canActivate() {
    const token = localStorage.getItem("accessToken");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }

    const isRefreshSuccess = (await this.userService.refreshingTokens(token)).isSuccess;
    if (!isRefreshSuccess) {
      this.router.navigate(["login"]);
    }

    return isRefreshSuccess;
  }


}