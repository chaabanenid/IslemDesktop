import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = "7902a914-f003-40c9-9567-eb0a84f117d1";

    if (!token) {
      return next.handle(req);
    }
    const req1 = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });

    return next.handle(req1);
  }
}
