import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiEnpoint = "http://localhost/Restaurant";
  basket = new basket;
  customer : any;
  oid : any;
  oid_bill : any;
  CusBasket : any;
  cusLogin = new cusLogin;
  constructor(private router : Router) {
    if(this.customer == null || this.oid == null){
      this.router.navigateByUrl('/first');
    }
  }
}
class basket{
  fid = 0;
  name = "";
  price =0;
  count = 0;
}
class cusLogin{
  cid =      0;
  name =     "";
  password =  "";
  money =     0;
  phone =     0;
  address =  "";
}
