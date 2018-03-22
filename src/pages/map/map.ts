import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UrlService } from '../../providers/url';
import { Network } from '@ionic-native/network';
import { AlertController } from 'ionic-angular';
import { Vibration } from '@ionic-native/vibration';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  subscription: Subscription;
  mapUrl: SafeResourceUrl;
  connected: boolean = navigator.onLine;
  loaded;

  constructor(private sendUrlService: UrlService, private sanitizer: DomSanitizer, private network: Network, private alertCtrl: AlertController, private vibration: Vibration) {
    this.connected=true;
    this.loaded=false;
    }
    ionViewWillEnter(){
      this.vibration.vibrate([30]);
    }
    ionViewWillLoad(){
      if(this.connected == true){
        this.subscription = this.sendUrlService.getUrl().subscribe(data => {
          this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            'https://public.opendatasoft.com/explore/embed/dataset/sirene/map/?q=' + data);
            this.loaded=true;
        });
        if(!this.mapUrl)
        {
          this.mapUrl= this.sanitizer.bypassSecurityTrustResourceUrl(
            'https://public.opendatasoft.com/explore/embed/dataset/sirene/map/');
            this.loaded=true;
        }
      }else {
        let alert = this.alertCtrl.create({
            title: 'Oops !',
            subTitle: 'La connexion entre votre appareil et nos données a été interrompue. Verifiez votre accès internet et relancez l\'application.',
            enableBackdropDismiss: false,
        });

        alert.present();
      }
    }
    isConnected(): void {
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
