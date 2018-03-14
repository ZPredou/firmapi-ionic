import { Component } from '@angular/core';
import { Constants, Filter, Filters}  from '../../model/Filter';
import { FirmApiProvider } from '../../providers/firm-api/firm-api';
import { UrlService } from '../../providers/url';

@Component({
  selector: 'filters',
  templateUrl: 'filters.html'
})
export class FiltersComponent {

  countResultat: number;
    filters = new Filters();
    constants = new Constants;
    tcas = this.constants.revenues;
    categories = this.constants.categories;
    tefets = this.constants.effectifs;
    params = '';

    constructor(private firmApiService: FirmApiProvider, private sendUrlService: UrlService) {
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
        this.firmApiService.searchCompanies(param, 0).subscribe(data => {
          newFilter.nhits = data.nhits;
        });
        this.filters[filter].filter.push(newFilter);


        this.params = this.sendUrlService.getUrlParameters(this.filters);
        this.sendUrlService.sendUrl(this.params);
      }
    }

    changeSelect(filter, value) {
      this.filters[filter].visible = false;
      this.filters[filter].filter = [];
      let param;


        for (let i = 0; i < value.length; i++) {
          if (this.checkIfFilterExists(filter, value[i]) === undefined) {
            const newFilter = new Filter();
            newFilter.data = value[i];
            param = filter + ':' + value[i];
            this.firmApiService.searchCompanies(param, 0).subscribe(data => {
              newFilter.nhits = data.nhits;
            });
            this.filters[filter].filter.push(newFilter);

            this.params = this.sendUrlService.getUrlParameters(this.filters);
            this.sendUrlService.sendUrl(this.params);
          }
        }
    }
    removeFilter(filter?, index?) {
      this.filters[filter].filter.splice(index, 1);
      if (this.filters[filter].filter.length === 0) {
        delete this.filters[filter].filter;
      }
      this.firmApiService.searchCompanies(this.params, 0).subscribe(data => {
      });

      this.params = this.sendUrlService.getUrlParameters(this.filters);
      this.sendUrlService.sendUrl(this.params);
    }

    checkIfFilterExists(filter, value) {
      if (this.filters[filter].filter === undefined) {
        return undefined;
      }
      return this.filters[filter].filter.find(function (element) {
        return element.data === value;
      });
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
