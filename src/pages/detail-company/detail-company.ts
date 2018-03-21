import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { CompanyInterface } from '../../providers/firm-api/firm-api-interface';

@IonicPage()
@Component({
  selector: 'page-detail-company',
  templateUrl: 'detail-company.html',
})
export class DetailCompanyPage {
item: CompanyInterface;

  constructor(public navCtrl: NavController, public navParams: NavParams, platform: Platform) {
    this.item = navParams.get('item');
  }
}
