import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler)
  :Observable<HttpEvent<any>> {
    const access_token = localStorage.getItem("jwt");
    
    //if(access_token){
        const transformedReq = req.clone({
            headers: req.headers.set('Authorization', `bearer ${access_token}`)});
        return next.handle(transformedReq);
    //}
   
    return next.handle(req);
  }
}