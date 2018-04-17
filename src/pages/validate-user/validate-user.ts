import { HomePage } from './../home/home';
import { AboutPage } from './../about/about';
import { Storage } from '@ionic/storage';
import { ServerProvider } from './../../providers/server/server';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { GamePage } from '../game/game';

@IonicPage()
@Component({
  selector: 'page-validate-user',
  templateUrl: 'validate-user.html',
})
export class ValidateUserPage {
  validateForm: FormGroup
  dataSended
  phone_number
  token

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public storage: Storage,
    public serverProvider: ServerProvider) {
      this.phone_number = this.navParams.get("phone_number") 
      this.storage.get("token").then((token)=> this.token = token)
      this.validateForm =  formBuilder.group({
        code: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(4)])],
      })
  }


  sendCode(form){
    if(this.validateForm.valid){
      this.serverProvider.sendCode(form.code, this.token)
        .then((response)=>{
          this.navCtrl.push(GamePage,{token: this.token})
        }).catch((err)=>{
            this.serverProvider.showToast("Codigo invalido") 
        })
    }else{
      console.log(this.validateForm.errors)
      this.serverProvider.showToast("Información no valida")    
    }
  }
  
  cancel(){
    this.navCtrl.push(HomePage)
  }
}
