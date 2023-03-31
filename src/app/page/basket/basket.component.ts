import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from 'src/app/service/cart.service';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {
  public food : any = [];
  public getTotal !: number;
  public price = 0;
  constructor(private cartService : CartService,private dialog : MatDialog) {
    this.cartService.cartItem.forEach((food:any)=>{
      this.price += food.price * food.amount;
    });
  }
  ngOnInit(): void {
    this.cartService.getFoods()
    .subscribe(res=>{
      this.food = res;
      this.getTotal = this.cartService.getTotalPrice();
    });
  }
  removeItem(Item:any){
    this.price = 0;
    this.cartService.removeItem(Item);
    this.cartService.cartItem.forEach((food:any)=>{
      this.price = food.price * food.amount;
    })
  }
  plus(){

  }
}
