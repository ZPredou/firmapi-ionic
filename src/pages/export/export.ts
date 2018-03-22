import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Vibration } from '@ionic-native/vibration';

@Component({
  selector: 'page-export',
  templateUrl: 'export.html'
})
export class ExportPage {

  constructor(public navCtrl: NavController, private vibration: Vibration) {

  }
  ionViewWillEnter(){
    this.vibration.vibrate([30]);
  }
}
