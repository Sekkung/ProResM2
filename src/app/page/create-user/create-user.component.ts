import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  constructor(private dataService : DataService , private http: HttpClient,private router:Router,private toast:NgToastService){}

  createUser(name : any , password : any , phone : any , address : any){

    let jsonObj2={
      name:name
    }

    let jsonObj = {
      name: name,
      password : password,
      phone : phone,
      address : address
    }

    let jsonString = JSON.stringify(jsonObj);
    let jsonString2 = JSON.stringify(jsonObj2);
    this.http.post(this.dataService.apiEnpoint + "/login/CheckUser",jsonObj2,
    {observe:'body'}).subscribe((tes)=>{
      if(tes>0){
        this.toast.error({detail:"มีบัญชีนี้อยู่ในระบบอยู่แล้ว",summary:'เปลี่ยนชื่อหรือรหัสผ่านของท่าน',duration:3000});
      }
      else{
          this.http.post(this.dataService.apiEnpoint + "/login/create" ,jsonString,
          {observe: 'response'}).subscribe((response)=>{
            console.log(JSON.stringify(response.status));
            console.log(JSON.stringify(response.body));
            this.toast.success({detail:"ทำการสมัครเสร็จสิ้น",summary:'ลงชื่อเข้าร้านอย่างสบายใจ 💸💸💸',duration:3000});
            this.router.navigateByUrl('/loginCus');
          });
      }
    });


  }
}
