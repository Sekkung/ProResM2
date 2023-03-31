import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './page/main/main.component';
import { OrderComponent } from './page/order/order.component';
import { BasketComponent } from './page/basket/basket.component';
import { LoginCusComponent } from './page/login-cus/login-cus.component';
import { LoginOwnerComponent } from './page/login-owner/login-owner.component';
import { FirstComponent } from './page/first/first.component';
import { CreateUserComponent } from './page/create-user/create-user.component';
import { Basket2Component } from './page/basket2/basket2.component';
import { BillComponent } from './page/bill/bill.component';

const routes: Routes = [
  {path:'',component:FirstComponent},
  {path:'first',component:FirstComponent},
  {path:'loginCus',component:LoginCusComponent},
  {path:'loginOwner',component:LoginOwnerComponent},
  {path:'createUser',component:CreateUserComponent},
  {path:'main',component:MainComponent},
  {path:'order',component:OrderComponent},
  {path:'basket',component:BasketComponent},
  {path:'basket2',component:Basket2Component},
  {path:'bill' ,component:BillComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
