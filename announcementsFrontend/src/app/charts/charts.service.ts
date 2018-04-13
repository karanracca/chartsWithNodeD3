import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConstants} from '../Shared/appConstants';
import 'rxjs/add/operator/map';

@Injectable()
export class ChartService {

  constructor (private http: HttpClient, private appConstants: AppConstants) { }

  createBarChart (values, file) {

    const httpOptions = {
      headers : new HttpHeaders({'x-access-token': localStorage.getItem('secretToken')})
    };

    let formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('barChartKeys', JSON.stringify(values));

    return this.http.post( `${this.appConstants.CHART_ENDPOINT}/createBarChart`, formData, httpOptions)
      .map((result) => {
        if (result.success) {
          return result;
        }
      });
  }

}
