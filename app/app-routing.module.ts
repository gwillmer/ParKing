import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { BuyComponent } from './buy/buy.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  /*
  {
    path: '',
    redirectTo: '/buy',
    pathMatch: 'full'
  },
  */
  {
    path: 'buy',
    component: BuyComponent
  },
  {
    path: 'special-events',
    component: SpecialEventsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  { 
    path: '', 
    redirectTo: '/profile', 
    pathMatch: 'full'
  },
  {
    path:'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
