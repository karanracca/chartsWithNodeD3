import {Subject} from 'rxjs/Subject';
import {Injectable} from '@angular/core';

@Injectable()
export class SpinnerService {
  showSpinner = new Subject();
}
