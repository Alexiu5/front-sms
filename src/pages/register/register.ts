import { ValidateUserPage } from './../validate-user/validate-user';
import { Storage } from '@ionic/storage';
import { ServerProvider } from './../../providers/server/server';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  registerForm: FormGroup

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public serverProvider : ServerProvider,
    public storage: Storage,
    public formBuilder: FormBuilder
  ) {
    //Form validations
    this.registerForm = formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      name: ['', Validators.compose([Validators.required])],
      mail: ['', Validators.compose([Validators.required])],
      phone_number: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(10), Validators.maxLength(10)])]
    })
  }

  ionViewWillLeave(){
    this.registerForm.reset()
    
  }

public registerUser(userData){
  let loading = this.serverProvider.presentLoading()
  loading.present();
  if(this.registerForm.valid == true){
      this.serverProvider.registerUser(userData)
        .then((data)=>{          
          //@ts-ignore
          let token = data.body.token
          this.storage.set("token", token)
          this.validateSms(token,userData)
          loading.dismiss()
        })
        .catch((err)=>{
          console.log(err)
          this.serverProvider.showToast('Revisa tu información')
          loading.dismiss()
        })
  }else{
      console.log(this.registerForm.getError)
      this.serverProvider.showToast("Datos incorrectos")
      loading.dismiss()
  }
}

  public validateSms(token, userData){
    this.serverProvider.validateUserNumber(userData.phone_number, token)
     .then((response)=>{
       //@ts-ignore
       this.navCtrl.push(ValidateUserPage, {phone_number: response.phone_number, message: response.message})
     })
     .catch(err=>{
       console.log(err)
     })
  }


}
