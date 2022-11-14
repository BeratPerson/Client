import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuardService } from './services/guard/auth-guard.service';
import { ProductComponent } from './pages/product/product.component';
import { CategoryComponent } from './pages/category/category.component';

const routes: Routes = [
  // , canActivate: [AuthGuardService]
  { path: '', redirectTo: "private/home", pathMatch: 'full' },
  { path: 'private', redirectTo: "private/home" },
  // { path: '**', redirectTo: "private/home" },
  {
    path: 'private', children: [
      { path: 'home', component: HomeComponent },
      { path: 'product', component: ProductComponent },
      { path: 'category', component: CategoryComponent },
    ], canActivate: [AuthGuardService]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
