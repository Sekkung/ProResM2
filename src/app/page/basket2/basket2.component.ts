import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Convert as CusBasketCvt, CusBasket} from 'src/app/model/cusBasket';
import { Convert as FoodOrderCvt, FoodOrder} from 'src/app/model/foodOrder';
import { Convert as orderCvt, Order } from 'src/app/model/order.model';
import { Convert as CustomerCvt,Customer} from 'src/app/model/customer';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-basket2',
  templateUrl: './basket2.component.html',
  styleUrls: ['./basket2.component.scss']
})
export class Basket2Component {
  foodOrders = Array<CusBasket>();
  // foodOrder : any;
  total : any;
  oid : any;
  sumPrice = Array();

  finish_orders = Array<Order>();
  finish_customer = this.dataService.customer;
  money = this.dataService.customer[0].money;
  constructor(private dataService : DataService , private http: HttpClient ,private router: Router,private toast:NgToastService){
    this.oid = this.dataService.oid;
    console.log(this.money);
    this.showOrder(this.oid);
    this.showFinishedOrder(this.finish_customer[0].cid);
    // this.selectCus(this.finish_customer[0].cid);



  }


  showOrder(oid : any){
    this.total = 0;
    this.http.get(this.dataService.apiEnpoint+'/consistof/order/' +oid).subscribe((data:any)=>{
      this.foodOrders = CusBasketCvt.toCusBasket(JSON.stringify(data));
      for(let i = 0 ; i<this.foodOrders.length;i++){
        this.total = this.total +(this.foodOrders[i].amount * this.foodOrders[i].price);
      }
      console.log(this.foodOrders);
    });

  }

  showFinishedOrder(cid:any){
    this.http.get(this.dataService.apiEnpoint + '/customer/payedOrder/'+cid).subscribe((data: any) => {
      this.finish_orders = orderCvt.toOrder(JSON.stringify(data));
      console.log(this.finish_orders);
    });
  }

  del(oid: any,fid : any){
    console.log(oid,fid);
    let jsonObj = {
      oid : oid,
      fid : fid
    }
    let jsonString = JSON.stringify(jsonObj);
    if(confirm("คุณต้องการลบออกจากตะกร้าหรือไม่")){
      this.http.post(this.dataService.apiEnpoint + "/consistof/del", jsonString,
      { observe: 'response' }).subscribe((response) => {
        this.realTime(oid);
        this.toast.success({detail:"ทำการลบสำเร็จ",summary:'ลบออกจากตะกร้าเรียบร้อย',duration:3000});
      });
    }
    // this.router.navigateByUrl('/basket2');

  }

  plusAmount(oid :any , fid:any){
    let jsonObj = {
      oid : oid,
      fid : fid
    }
    let jsonString = JSON.stringify(jsonObj);
    this.http.post(this.dataService.apiEnpoint + "/consistof/plusAmount" ,jsonString,
    {observe: 'response'}).subscribe((response)=>{
      this.realTime(oid);
    });

  }
  minusAmount(oid :any , fid:any){
    let jsonObj = {
      oid : oid,
      fid : fid
    }
    let jsonString = JSON.stringify(jsonObj);
    this.http.post(this.dataService.apiEnpoint + "/consistof/minusAmount" ,jsonString,
    {observe: 'response'}).subscribe((response)=>{
      this.realTime(oid);
    });
  }

  saveOidToDataService(oid : any){
    this.dataService.oid_bill = oid;
  }

  payUpdate(oid : any){
    if(this.money >= this.total && this.total != 0){
      //update status order
      let jsonObj = {
        oid: oid
      }
      let jsonString = JSON.stringify(jsonObj);
      if(confirm("ยืนยันการชำระเงิน")){
        this.http.post(this.dataService.apiEnpoint + "/iorder/payUpdate", jsonString,
        { observe: 'response' }).subscribe((response) => {
          this.toast.success({detail:"ชำระเงินเสร็จสิ้น",summary:'ขอบคุณครับ 💸💸💸',duration:3000});
        });
      }


      // update money
      this.money=this.money - this.total;
      this.dataService.customer[0].money = this.money;
      this.moneyUpdate(this.money,this.dataService.customer[0].cid);
      this.showFinishedOrder(this.dataService.customer[0].cid)
      this.insertIorder();
      // this.selectCus(this.dataService.customer[0].cid);
    }

    this.realTime(oid);
  }
  moneyUpdate(money:any ,cid:any){
    let jsonObj = {
      cid : cid,
      money : money
    }
    let jsonString = JSON.stringify(jsonObj);
    this.http.post(this.dataService.apiEnpoint + "/customer/update/money", jsonString,
      { observe: 'response' }).subscribe((response) => { });
  }

  async insertIorder(){
    //create order
    let jsonObj = {
      cid : this.dataService.customer[0].cid
    }
    let jsonString = JSON.stringify(jsonObj);
    let data :any = await lastValueFrom(this.http.post(this.dataService.apiEnpoint + "/iorder/insert", jsonString));
    this.dataService.oid = data[0].oid;
  }

  // async selectCus(cid : any){
  //   let data :any = await lastValueFrom(this.http.get(this.dataService.apiEnpoint + '/customer/select/' + cid));
  //   this.finish_customer = CustomerCvt.toCustomer(JSON.stringify(data));
  //   console.log(this.finish_customer);

  // }


  realTime(oid: any){
    this.total = 0;
    this.http.get(this.dataService.apiEnpoint+'/consistof/order/' +oid).subscribe((data:any)=>{
      this.foodOrders = CusBasketCvt.toCusBasket(JSON.stringify(data));
      for(let i = 0 ; i<this.foodOrders.length;i++){
        this.total = this.total +(this.foodOrders[i].amount * this.foodOrders[i].price);
      }
      console.log(this.foodOrders);
    });
  }

}

// for(let i = 0 ; i<this.foodOrder.length;i++){
      //   this.total = this.total +(this.foodOrder[i].amount * this.foodOrder[i].price);
      // }
