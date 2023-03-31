import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Convert as orderCvt, Order } from 'src/app/model/order.model';
import { Convert as FoodOrderCvt, FoodOrder } from 'src/app/model/foodOrder';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent {
  foodOrders = Array<FoodOrder>();
  finish_orders = Array<Order>();
  Total = 0;
  oid = this.dataService.oid_bill;
  constructor(private dataService: DataService, private http: HttpClient) {
    this.show(this.oid);
  }

  show(oid: number) {
    this.Total = 0;
    this.http.get(this.dataService.apiEnpoint + '/order/info/' + oid).subscribe((data: any) => {
      this.foodOrders = FoodOrderCvt.toFoodOrder(JSON.stringify(data));
      for (let i = 0; i < this.foodOrders.length; i++) {
        this.Total = this.Total + (this.foodOrders[i].amount * this.foodOrders[i].price);
      }
    });
    this.showFinishedOrder(oid);
    // this.customerInfo(oid);
  }

  showFinishedOrder(oid:any){
    this.http.get(this.dataService.apiEnpoint + '/ioder/CustomerInfo/'+oid).subscribe((data: any) => {
      this.finish_orders = orderCvt.toOrder(JSON.stringify(data));
      console.log(this.finish_orders);
    });
  }
}
