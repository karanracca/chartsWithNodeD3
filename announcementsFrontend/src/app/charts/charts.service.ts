import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {AppConstants} from '../shared/appConstants';
import 'rxjs/add/operator/map';
import {SpinnerService} from '../shared/spinner.service';
import {catchError} from 'rxjs/operators';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';

@Injectable()
export class ChartService {

  constructor (private http: HttpClient,
               private appConstants: AppConstants,
               private spinner: SpinnerService) {
  }

  private handleError(error: HttpErrorResponse) {
    this.spinner.showSpinner.next(false);
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      error.error.message || 'Something went wrong; please try again later.');
  }

  createBarChart (values, file) {

    this.spinner.showSpinner.next(true);

    const httpOptions = {
      headers : new HttpHeaders({'x-access-token': localStorage.getItem('secretToken')})
    };

    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('barChartKeys', JSON.stringify(values));

    return this.http.post( `${this.appConstants.CHART_ENDPOINT}/createBarChart`, formData, httpOptions)
      .map((result: any) => {
        if (result.success) {
          this.spinner.showSpinner.next(false);
          return result.payload;
        }
      }).pipe(catchError(this.handleError.bind(this)));
  }

  createPieChart (values, file) {
    const httpOptions = {
      headers : new HttpHeaders({'x-access-token': localStorage.getItem('secretToken')})
    };

    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('pieChartKeys', JSON.stringify(values));

    return this.http.post( `${this.appConstants.CHART_ENDPOINT}/createPieChart`, formData, httpOptions)
      .map((result: any) => {
        if (result.success) {
          return result;
        }
      });

  }

  createLineChart (values, file) {

    const httpOptions = {
      headers : new HttpHeaders({'x-access-token': localStorage.getItem('secretToken')})
    };

    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('lineChartKeys', JSON.stringify(values));

    return this.http.post( `${this.appConstants.CHART_ENDPOINT}/createLineChart`, formData, httpOptions)
      .map((result: any) => {
        if (result.success) {
          return result;
        }
      });
  }

  saveGeneratedChart (chartData: any) {
    const httpOptions = {
      headers : this.appConstants.privateHeaders
    };

    return this.http.post( `${this.appConstants.CHART_ENDPOINT}/saveChart`, chartData, httpOptions)
      .pipe(catchError(this.handleError.bind(this)));
  }

  createDonutChart (values, file) {
    const httpOptions = {
      headers : new HttpHeaders({'x-access-token': localStorage.getItem('secretToken')})
    };

    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('donutChartKeys', JSON.stringify(values));

    return this.http.post( `${this.appConstants.CHART_ENDPOINT}/createDonutChart`, formData, httpOptions)
      .map((result: any) => {
        if (result.success) {
          return result;
        }
      }).pipe(catchError(this.handleError.bind(this)));

  }
}
