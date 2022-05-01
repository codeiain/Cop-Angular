import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpResponse } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { map, Observable, retry } from 'rxjs';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { Guid } from 'guid-typescript';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  token: string | undefined;
  omitCalls = ['auth']; //part of url or full url
  skipInterceptor = false;
  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.omitCalls.forEach(api => {
      if (req.url.includes(api)) {
        this.skipInterceptor = true;
      }
    });
    this.token = 'TokenHere'
    if (this.token || this.skipInterceptor) {
      const tokenizedReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.token).set('CorrelationId',Guid.create().toString()) });
      return next.handle(tokenizedReq).pipe(map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.status === 401) {
            //navigate back to login page
            this.router.navigateByUrl('core/login');
          }
        }
        return event;
      }));
    } else {
      this.router.navigateByUrl('core/login');
    }
    return next.handle(req).pipe(retry(3));
  }

  
}
