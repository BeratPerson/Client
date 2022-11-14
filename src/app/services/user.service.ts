import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { User } from '../models/user';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public invalidLogin: boolean = false;
  public invalidRegister = false;

  constructor(private router: Router, private http: HttpClient, private notification: NotificationService) { }


  login(user: User) {
    this.http.post("/api/Auth/Login", {
      usernameOrEmail: user.username,
      password: user.password
    }).subscribe({
      next: (response) => {
        this.notification.showSuccess("User login successful", "Success")
        const token = (<any>response).token;
        const refreshToken = (<any>response).token.refreshToken;
        localStorage.setItem("accessToken", token.accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        this.invalidLogin = false;
        this.router.navigate(["/"]);
      },
      error: (err) => {
        this.notification.showError("Invalid username or password.", "Error")
        this.invalidLogin = true;
      },
      complete: () => console.log('Success')

    });
  }

  register(registerModel: User) {
    this.http.post("/api/User",
      registerModel
    ).subscribe({
      next: (response) => {
        this.invalidRegister = false;
        this.notification.showSuccess("New user registered successfully", "Success")
        this.router.navigate(["/login"]);
      },
      error: (err) => {
        this.notification.showError("User already exists / register user failed", "Error")
        this.invalidRegister = true;
      },
      complete: () => console.info('Register complete')
    });
    return this.invalidRegister;
  }

  public async refreshingTokens(token: string | null): Promise<refreshtokenResponse> {
    const refreshToken: string | null = localStorage.getItem("refreshToken");

    if (!token || !refreshToken) {
      return { isSuccess: false, token: "" };
    }

    const tokenModel = JSON.stringify({ refreshToken: refreshToken });

    let isRefreshSuccess: boolean;
    try {
      const response = await lastValueFrom(this.http.post("/api/Auth/RefreshTokenLogin", tokenModel));
      const token = (<any>response).token;
      const refreshToken = (<any>response).token.refreshToken;
      localStorage.setItem("accessToken", token.accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      this.notification.showSuccess("Token renewed successfully", "Success")
      isRefreshSuccess = true;
      return { isSuccess: isRefreshSuccess, token: token.accessToken };
    }
    catch (ex) {
      isRefreshSuccess = false;
    }
    return { isSuccess: isRefreshSuccess, token: "" };

  }

}
export interface refreshtokenResponse {
  isSuccess: boolean;
  token: string;
}