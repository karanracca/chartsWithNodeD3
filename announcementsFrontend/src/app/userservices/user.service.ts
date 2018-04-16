import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AppConstants} from '../Shared/appConstants';
import 'rxjs/add/operator/map';
import {User} from './signup/user.model';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserServices {

  constructor(private http: HttpClient, private appConstants: AppConstants) {
  }

  private handleError(error: HttpErrorResponse) {
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


  login(username: string, password: string) {

    const httpOptions = {
      headers: this.appConstants.headers
    };

    const body = {
      'username': username,
      'password': password
    };

    return this.http.post(`${this.appConstants.USER_ENDPOINT}/authenticate`, body, httpOptions)
      .map((result: any) => {
        if (result.success) {
          console.log(result);
          localStorage.setItem('secretToken', result.token);
          return result;
        }
      }).pipe(catchError(this.handleError));


  }

  createUser(userInfo: User) {
    console.log('called');
    const httpOptions = {
      headers: this.appConstants.headers
    };

    return this.http.post(`${this.appConstants.USER_ENDPOINT}/createUser`, userInfo, httpOptions).pipe(catchError(this.handleError));
  }

}
