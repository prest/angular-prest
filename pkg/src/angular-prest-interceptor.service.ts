import { Injectable, Inject } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { PrestConfig } from './angular-prest.config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class AngularPrestInterceptorService implements HttpInterceptor {

    constructor(
        @Inject(DOCUMENT) private document: any,
        @Inject('config') private config: PrestConfig
    ) {}

    /**
     * Intercept request
     * @param req HttpRequest
     * @param next HttpHandler
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).do(
            (event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    return event;
                }
            },
            (err) => {
                if (err instanceof HttpErrorResponse) {
                    switch(err.status) {
                        case 401: {
                            this.document.location.href =
                            `${this.document.location.protocol}//${this.document.location.hostname}:${this.document.location.port}/${this.config.loginPath}`;
                            break;
                        }
                    }
                }
            }
        );
    }

}
