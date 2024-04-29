import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {
  constructor(private inj: Injector, private auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.auth.getUserIdToken().pipe(
      switchMap((token) => {
        console.log('TokenInterceptor: User token', token);
        if (token) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
        }
        return next.handle(request);
      })
    );
  }
}
