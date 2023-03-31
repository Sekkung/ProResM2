import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Convert as CustomerCvt,Customer } from 'src/app/model/customer';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { Convert as orderCvt, Order} from 'src/app/model/order.model';
import { Convert as OidCvt,Oid} from 'src/app/model/oid';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-login-cus',
  templateUrl: './login-cus.component.html',
  styleUrls: ['./login-cus.component.scss']
})
export class LoginCusComponent {
  customer:  any;
  path = '';
  cusInfo:any;
  constructor(private router : Router,private dataService: DataService,private http: HttpClient,private toast:NgToastService){

  }
  async login(name : any,password :any){
    let jsonObj = {
      name : name,
      password : password
    }
    let jsonString = JSON.stringify(jsonObj);
    try{
      let data :any = await lastValueFrom(this.http.post(this.dataService.apiEnpoint + '/login/customer' , jsonString));
      this.customer = CustomerCvt.toCustomer(JSON.stringify(data));
      this.dataService.customer = this.customer;  //save to data service
      if(this.customer != null){
          console.log(this.customer.name);
          this.toast.success({detail:"ล๊อคอินสำเร็จ",summary:'ยินดีต้อนรับ คุณลูกค้าที่หน้ารัก 💖💖💖',duration:3000});
          this.router.navigateByUrl('/main');
          this.checkOrder();
      }
    }catch(e){
      this.toast.error({detail:"ล๊อคอินไม่สำเร็จ",summary:'ตรวจดูรหัสผ่านของท่านอีกรอบ',duration:3000});
    }
}

  async checkOrder(){
    let jsonObj = {
      cid : this.dataService.customer[0].cid
    }
    let jsonString = JSON.stringify(jsonObj);
    let data :any = await lastValueFrom(this.http.post(this.dataService.apiEnpoint + "/iorder/notpay", jsonString));
    console.log(data[0].oid);

    if(data[0].oid == undefined) {
      this.insertIorder();
    }else{
      this.dataService.oid = data[0].oid;
      console.log(this.dataService.oid);
    }

  }

  async insertIorder(){
    //create order
    let jsonObj = {
      cid : this.dataService.customer[0].cid
    }
    let jsonString = JSON.stringify(jsonObj);
    let data :any = await lastValueFrom(this.http.post(this.dataService.apiEnpoint + "/iorder/insert", jsonString));
    // console.log(data[0].oid);
    this.dataService.oid = data[0].oid;
    // console.log(this.dataService.oid);

  }
}
