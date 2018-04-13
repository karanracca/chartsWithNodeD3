import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConstants} from '../Shared/appConstants';
import 'rxjs/add/operator/map';
import {User} from './signup/user.model';

@Injectable()
export class UserServices {

  constructor (private http: HttpClient, private appConstants: AppConstants) { }

  login(username: string, password: string) {

    const httpOptions = {
      headers : this.appConstants.headers
    };

    const body = {
      'username': username,
      'password': password
    };

    return this.http.post( `${this.appConstants.USER_ENDPOINT}/authenticate`, body, httpOptions)
      .map(result => {
        if (result.success) {
          return result;
        }
      });
  }

  createUser(userInfo: User) {

    const httpOptions = {
      headers : this.appConstants.headers
    };

    const body = userInfo;

    return this.http.post( `${this.appConstants.USER_ENDPOINT}/createUser`, body, httpOptions)
      .map(result => {
        if (result.success) {
          return result;
        }});
  }

}
