import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor() {}
  
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        
      const token = JSON.parse(localStorage.getItem('access_token') || ""); 
      const url = request.url;      
      if(token && !url.endsWith('/oauth/token'))
      {
        const jwt = token.access_token;
        request = request.clone({
          setHeaders:
          {
            Authorization: 'Bearer '+jwt
          }
        })
      }  
      
      return next.handle(request);
    }
  }
  

