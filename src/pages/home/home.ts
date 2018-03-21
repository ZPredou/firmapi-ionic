import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { DetailCompanyPage } from '../detail-company/detail-company';
import { FirmApiProvider } from '../../providers/firm-api/firm-api';
import { CompanyInterface } from '../../providers/firm-api/firm-api-interface';
import { UrlService } from '../../providers/url';
import { Subscription } from 'rxjs/Subscription';
import { TutorialPage } from "../tutorial/tutorial";
import { Vibration } from '@ionic-native/vibration';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  subscription: Subscription;
  items: CompanyInterface[] = [];
  nhits: number;
  params = '';

  constructor(public navCtrl: NavController, public firmApiProvider: FirmApiProvider, private sendUrlService: UrlService, private vibration: Vibration, private loader: LoadingController) {
    let loading = this.loader.create({
      content: 'Chargement en cours...'
    });
    loading.present();

    this.firmApiProvider.searchCompanies(this.params, 30).subscribe(data => {
      this.nhits = data.nhits;
      for (let i = 0; i < data.records.length; i++) {
        this.items.push(data.records[i]);
      }
      loading.dismiss();
    });
    this.subscription = this.sendUrlService.getUrl().subscribe(url => {
      this.items = [];
      this.params = url;
      this.firmApiProvider.searchCompanies(this.params, 30).subscribe(data => {
        this.nhits = data.nhits;
        for (let i = 0; i < data.records.length; i++) {
          this.items.push(data.records[i]);
        }
      });
    });
  }

  public goToDetailCompany(item) {
    this.navCtrl.push(DetailCompanyPage, {item: item});
  }

  doInfinite(infiniteScroll) {

    setTimeout(() => {
      this.firmApiProvider.searchCompanies('', 30, this.items.length).subscribe(data => {
        for (let i = 0; i < data.records.length; i++) {
          this.items.push(data.records[i]);
          infiniteScroll.complete();
        }
      });
    }, 500);
  }

  public showTutorial() {
    this.navCtrl.push(TutorialPage);
  }
  private vibrate(){
    this.vibration.vibrate([30]);
  }
}
