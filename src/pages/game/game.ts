import { ServerProvider } from './../../providers/server/server';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import {trigger, state, style, transition, animate} from '@angular/animations'

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
  animations:[
    trigger('wheel', [
      state('inactive', style({
        transform: `rotate(2400deg)`
      })),
      state('active', style({
        transform: `rotate(1300deg)`
      })),
      transition('* => *', animate('1.8s ease-in-out')),
    ])
  ]
})
export class GamePage {

  estado = 'x'
  count 
  constructor(public navCtrl: NavController, public navParams: NavParams,public server : ServerProvider, public viewCtrl : ViewController, public plt : Platform) {
      this.count = 0
  }

  ionViewWillEnter() {
    if (this.plt.is('ios')) {
      this.viewCtrl.setBackButtonText('Cerrar sesion')
    }else{
      this.viewCtrl.setBackButtonText('Cerrar')
    }
    
 }

  stopAnimation(){
    this.estado = (this.estado == 'active') ? 'inactive' : 'active'
  }

  showEarning(){
    this.count++

    if(this.count > 1){
      setTimeout(() => this.server.presentAlert('Ganaste', 'Bono de 10usd en amazon'), 200)
    }
    
  }

}
