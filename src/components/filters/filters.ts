import { Component } from '@angular/core';
import { Const, Filter, AllFilters } from '../../model/Filter';
import { FirmApiProvider } from '../../providers/firm-api/firm-api';
import { UrlService } from '../../providers/url';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'filters',
  templateUrl: 'filters.html'
})
export class FiltersComponent {

  filters = new AllFilters();
  const = new Const;
  tcas = this.const.rev;
  categories = this.const.categ;
  tefets = this.const.effec;
  params = '';

  constructor(private firmApiService: FirmApiProvider, private UrlService: UrlService, private loadingCtrl: LoadingController) {
  }

  addFilter(filter, value, dateBefore?) {
    this.filters[filter].visible = false;
    let param;
    if (this.filters[filter].filter === undefined) {
      this.filters[filter].filter = [];
    }

    if (this.checkIfFilterExists(filter, value) === undefined) {
      const newFilter = new Filter();
      newFilter.data = value;
      if (dateBefore !== undefined) {
        newFilter.dateBefore = dateBefore;
        param = dateBefore ? (filter + '<' + value) : (filter + '>' + value);
      } else {
        param = filter + ':' + value;
      }
      let loader = this.loadingCtrl.create({
        content: 'Chargement en cours...'
      });

      loader.present();

      this.firmApiService.searchCompanies(param, 0).subscribe(data => {
        newFilter.nhits = data.nhits;
        loader.dismiss();
      });
      this.filters[filter].filter.push(newFilter);


      this.params = this.UrlService.getUrlParameters(this.filters);
      this.UrlService.sendUrl(this.params);
    }
  }

  changeSelect(filter, value) {
    this.filters[filter].visible = false;
    this.filters[filter].filter = [];
    let param;

    let loader = this.loadingCtrl.create({
      content: 'Chargement en cours...'
    });

    loader.present();
    if (value.length !== 0) {
      for (let i = 0; i < value.length; i++) {
        if (this.checkIfFilterExists(filter, value[i]) === undefined) {
          const newFilter = new Filter();
          newFilter.data = value[i];
          param = filter + ':' + value[i];
          this.firmApiService.searchCompanies(param, 0).subscribe(data => {
            newFilter.nhits = data.nhits;
            if (i + 1 === value.length) {
              loader.dismiss();
            }
          });
          this.filters[filter].filter.push(newFilter);

          this.params = this.UrlService.getUrlParameters(this.filters);
          this.UrlService.sendUrl(this.params);
        }
      }
    } else {
      this.removeFilter(filter);
      loader.dismiss();
    }
  }

  checkIfFilterExists(filter, value) {
    if (this.filters[filter].filter === undefined) {
      return undefined;
    }
    return this.filters[filter].filter.find(function (element) {
      return element.data === value;
    });
  }

  removeFilter(filter?, index?) {
    this.filters[filter].filter.splice(index, 1);
    if (this.filters[filter].filter.length === 0) {
      delete this.filters[filter].filter;
    }
    let loader = this.loadingCtrl.create({
      content: 'Chargement en cours...'
    });

    loader.present();
    this.firmApiService.searchCompanies(this.params, 0).subscribe(data => {
      loader.dismiss();
    });

    this.params = this.UrlService.getUrlParameters(this.filters);
    this.UrlService.sendUrl(this.params);
  }

  findEffectif(arrayLibelle, value) {
    let array;
    if (arrayLibelle === 'categorie') {
      array = this.categories;
    } else {
      array = this.tefets;
    }
    let selectedOption = array.find(function (element) {
      return element.value == value;
    });
    return selectedOption.libelle;
  }

}
