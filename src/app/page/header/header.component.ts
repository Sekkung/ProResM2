import { Component } from '@angular/core';
import { Convert as FoodtypeCvk,Foodtype } from 'src/app/model/foodtype';
import { Convert as  FoodCvk,Food} from 'src/app/model/food';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private dataService: DataService){

  }
  resetOid(){
    this.dataService.oid = null;
    console.log(this.dataService.oid);

  }
}
