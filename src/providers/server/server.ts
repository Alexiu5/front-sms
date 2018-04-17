import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController, LoadingController, AlertController  } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';
import { AppSettingsProvider } from './../app-settings/app-settings';

@Injectable()
export class ServerProvider {
  apiUrl = this.appSettings.getServerUrl();
  status:any
  
  
  constructor(public http: HttpClient,
    public appSettings: AppSettingsProvider,
    public toastCtrl: ToastController,
    public alertCtrl : AlertController,
    public storage: Storage,
    public loadingCtrl : LoadingController) {}
  
  public login(formData){
    return new Promise((resolve, reject) => {
        this.http.post(`${this.apiUrl}/app/login`,formData,{observe:'response'})
        .subscribe(data => {
          resolve(data)
        },err => {
          reject(err)
        })
    })
  }

  public registerUser(userData){
    console.log(userData)
    return new Promise((resolve, reject)=>{
      this.http.post(`${this.apiUrl}/api/signup`, userData, {observe:'response'})
        .subscribe((data) =>{
          resolve(data)}, err =>{reject(err)})
    })
  }

  public validateUserNumber(userNumber, token){
    let header = new HttpHeaders()
    let other_header = header.append("authorization",`beare ${token}`)
    
    return new Promise((resolve, reject)=>{
      this.http.get(`${this.apiUrl}/api/validate-sms/${userNumber}`,{headers: other_header})
        .subscribe((res)=>{
          resolve(res)
        }, err=>{reject(err)})
    })
  }
  

  public closeSession(){
    this.storage.set("token","");
    console.log('you have been logged out');
    
  }

  public sendCode(smsCode, token){
    let header = new HttpHeaders()
    let other_header = header.append("authorization",`beare ${token}`)

    let authCode = {
      code : smsCode
    }
    console.log(token);
    
    return new Promise((resolve, reject)=>{
      this.http.post(`${this.apiUrl}/api/validate-code/`,authCode, {headers: other_header, observe: 'response'})
      .subscribe(data => {resolve(data)}
      ,err => {reject(err)})
    })
  }

  //You should create a Ui provider for this cases
  public showToast(message:string){
    let toast = this.toastCtrl.create({
      position: 'top',
      message: message,
      duration : 3000,
    })
    toast.present()
  }


  public presentLoading(){
    return this.loadingCtrl.create({
      content: 'please wait'
    })
  }

  presentAlert(title, subTitle){
    let alert = this.alertCtrl.create({
      title : title,
      subTitle: subTitle,
      buttons : ['Entendido']
    })

    alert.present()
  }
}


