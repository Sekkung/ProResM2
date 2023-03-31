import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Convert as orderCvt, Order } from 'src/app/model/order.model';
import { Convert as FoodOrderCvt, FoodOrder } from 'src/app/model/foodOrder';
import { Convert as CustomerCvt,Customer} from 'src/app/model/customer';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  orders = Array<Order>();
  foodOrders = Array<FoodOrder>();
  finish_orders = Array<Order>();
  Total = 0;
  sumPrice = Array();
  customer = Array<Customer>();
  oid_perOrder : any;
  constructor(private dataService: DataService, private http: HttpClient,private toast:NgToastService) {
    http.get(dataService.apiEnpoint + '/order').subscribe((data: any) => {
      this.orders = orderCvt.toOrder(JSON.stringify(data));
      console.log(this.orders);
    });

  }

  show(oid: number) {
    this.Total = 0;
    this.oid_perOrder = oid;
    this.http.get(this.dataService.apiEnpoint + '/order/info/' + oid).subscribe((data: any) => {
      this.foodOrders = FoodOrderCvt.toFoodOrder(JSON.stringify(data));
      for (let i = 0; i < this.foodOrders.length; i++) {
        this.Total = this.Total + (this.foodOrders[i].amount * this.foodOrders[i].price);
      }
    });
    this.showFinishedOrder(oid);
    // this.customerInfo(oid);

  }

  customerInfo(oid:any){

    this.http.get(this.dataService.apiEnpoint + '/customer/info/'+oid).subscribe((data:any)=>{
      this.customer = CustomerCvt.toCustomer(JSON.stringify(data));
      console.log(this.customer);

    });



  }

  updateStatus(oid: any, status: any) {
    let jsonObj = {
      oid: oid,
      status: status
    }
    let jsonString = JSON.stringify(jsonObj);
    if (jsonObj.status == 'กำลังจัดส่ง') {
      if(confirm("ต้องการเปลี่ยนสถานะการจัดส่งหรือไม่")){
        this.http.post(this.dataService.apiEnpoint + "/iorder/passing", jsonString,
        { observe: 'response' }).subscribe((response) => {
          this.toast.success({detail:"เปลี่ยนสถานะเสร็จสิ้น",summary:'ตั้งใจทำงาน',duration:2000});
        });
      }

    }
    // else if(jsonObj.status == 'จัดส่งสำเร็จ'){
    //   this.http.post(this.dataService.apiEnpoint + "/iorder/finished", jsonString,
    //   { observe: 'response' }).subscribe((response) => { });
    // }
    this.showFinishedOrder(oid);
    this.realTime();
  }

  showFinishedOrder(oid:any){
    this.http.get(this.dataService.apiEnpoint + '/ioder/CustomerInfo/'+oid).subscribe((data: any) => {
      this.finish_orders = orderCvt.toOrder(JSON.stringify(data));
      console.log(this.finish_orders);
    });
  }

  realTime(){
    this.http.get(this.dataService.apiEnpoint + '/order').subscribe((data: any) => {
      this.orders = orderCvt.toOrder(JSON.stringify(data));
      console.log(this.orders);
    });
  }
}
