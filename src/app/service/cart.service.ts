import { Injectable } from '@angular/core';
import { BehaviorSubject, count } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItem : any=[];
  public foodList = new BehaviorSubject<any>([]);
  constructor() {
  }
  getFoods(){
   return this.foodList.asObservable();
  }
  addtoCart(food:any){
    this.cartItem.push(food);
    this.foodList.next(this.cartItem);
  }
  getTotalPrice():number{
    let Total = 0;
    this.cartItem.map((a:any)=>{
      Total += a.price;
    });
    return Total;
  }
  removeItem(food:any){
    this.cartItem.map((a:any,index:any)=>{
      if(food.fid == a.fid){
        this.cartItem.splice(index,1);
      }
    })
  }
}

