import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { DetailCompanyPage } from '../detail-company/detail-company';
import { FirmApiProvider } from '../../providers/firm-api/firm-api';
import { CompanyInterface } from '../../providers/firm-api/firm-api-interface';
import { UrlService } from '../../providers/url';
import { Subscription } from 'rxjs/Subscription';
import { TutorialPage } from "../tutorial/tutorial";
import { Vibration } from '@ionic-native/vibration';
import { Network } from '@ionic-native/network';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  subscription: Subscription;
  items: CompanyInterface[] = [];
  nhits: number;
  params = '';
  connected: boolean = navigator.onLine;
  loaded;

  constructor(public navCtrl: NavController, public firmApiProvider: FirmApiProvider, private sendUrlService: UrlService, private vibration: Vibration, private loader: LoadingController, private network: Network, private alertCtrl: AlertController) {
    this.loaded=false;
  }
  ionViewWillEnter() {
    this.isConnected();

    if(this.connected == true){
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
        this.loaded=true;
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
    }else {
      let alert = this.alertCtrl.create({
          title: 'Oops !',
          subTitle: 'La connexion entre votre appareil et nos données a été interrompue. Verifiez votre accès internet et relancez l\'application.',
          enableBackdropDismiss: false,
      });

      alert.present();
    }
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
   private isConnected(): void {
    if(this.connected == true){
      this.network.onDisconnect().subscribe(
          () => this.connected = false,
      );
    }
    if(this.connected == false){
        this.network.onConnect().subscribe(
            () => this.connected = true,
        );
      }
    }

}
