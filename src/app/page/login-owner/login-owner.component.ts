import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Convert as OwnerCvt,Owner } from 'src/app/model/owner';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login-owner',
  templateUrl: './login-owner.component.html',
  styleUrls: ['./login-owner.component.scss']
})
export class LoginOwnerComponent {
  owner:  any;
  path = '';
  constructor(private router : Router,private dataService: DataService,private http: HttpClient,private toast:NgToastService){

  }
  async login(username : any,password :any){
    let jsonObj = {
      username : username,
      password : password
    }
    let jsonString = JSON.stringify(jsonObj);
    try{
      let data :any = await lastValueFrom(this.http.post(this.dataService.apiEnpoint + '/login/owner' , jsonString));
      this.owner = OwnerCvt.toOwner(JSON.stringify(data));
      if(this.owner != null){
        this.toast.success({detail:"ล๊อคอินสำเร็จ",summary:'ยินดีต้อนรับ',duration:3000});
        this.router.navigateByUrl('/order');
      }
    }
    catch(e){
      this.toast.error({detail:"ล๊อคอินไม่สำเร็จ",summary:'ตรวจดูรหัสผ่านของท่านอีกรอบ',duration:3000});
    }


  }
}
