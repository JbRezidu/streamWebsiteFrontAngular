import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';



import {select} from '@angular-redux/store';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

  @select('authentication') authentication$: Observable<any>;

  private authentication;

  constructor() {
    this.authentication$.subscribe(authentication => {
      this.authentication = authentication;
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq;
    if ((this.authentication.connectedUser || {}).pseudo) {
      authReq = req.clone({
        setHeaders: {
          Token: this.authentication.token,
          User: this.authentication.connectedUser.pseudo,
        }
      });
    }

    // send the newly created request
    return next.handle(authReq || req);
  }
}
