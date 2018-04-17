import { HomePage } from './../home/home';
import { ServerProvider } from './../../providers/server/server';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  token:string;
  pageParams = {}

  constructor(public navCtrl: NavController, public navParams:NavParams, public storage :Storage, public serverProvider : ServerProvider) {
      
  }

  public loadAllParams(){
    this.token = this.navParams.get("token")
    console.log(`this is the data from about page: ${this.token}`);
  }

  private signOut(){
    this.serverProvider.closeSession();
    this.navCtrl.push(HomePage)
  }
  
}
