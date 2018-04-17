import { GamePage } from './../game/game';
import { ValidateUserPage } from './../validate-user/validate-user';
import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { RegisterPage } from './../register/register';
import { AboutPage } from './../about/about'; 
import { ServerProvider } from './../../providers/server/server';


// import 'rxjs/add/operator/map';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  loginForm: FormGroup
  constructor(public navCtrl: NavController,
     public serverProvider: ServerProvider,
     public toastCtrl: ToastController,
     public storage: Storage,
     public formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(30)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    })
  }

  ionViewWillLeave(){
    this.loginForm.reset()
  }

  login(formData){ 
    let loading = this.serverProvider.presentLoading()
    loading.present();

    if(this.loginForm.valid == true){
      this.serverProvider.login(formData)
        .then((data)=>{
          //@ts-ignore
          this.storage.set("token", data.body.token)         
          //@ts-ignore
          this.navCtrl.push(GamePage, data.body)
          loading.dismiss()  
        })
        .catch((error)=>{
          this.serverProvider.showToast('contraseña o usuario incorrectos')
          loading.dismiss()
      })      
    }else{
      this.serverProvider.showToast('Información inconsistente')
    }
  }

  sendToRegister(){
    this.navCtrl.push(RegisterPage)
  }
}


  
