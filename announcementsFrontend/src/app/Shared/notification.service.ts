import {Subject} from 'rxjs/Subject';
import {Injectable} from '@angular/core';

@Injectable()
export class NotificationService {
  notification = new Subject();
}
