import {
  Injectable,
  Inject
} from '@angular/core';

import {
  Http,
  Response,
  RequestOptionsArgs,
  RequestOptions,
  Headers
} from '@angular/http';

import {
  Observable
} from 'rxjs';
import 'rxjs/add/operator/map';

export declare type PrestUrlParams = string | { [name: string]: string } | null;

@Injectable()
export class AngularPrestService {

  constructor(
    private http: Http,
    @Inject('config') private config: any
  ) {
    if (this.config.baseUrl.substr(-1) !== '/') {
      this.config.baseUrl += '/';
    }    
  }

  private getToken(): string {
    let data = JSON.parse(localStorage.getItem(this.config.localStorageData) || '{}');
    return data[this.config.tokenPath];
  }

  private getRequestOptions(params?: PrestUrlParams): RequestOptions {
    const options = {
      headers: new Headers({'Content-Type': 'application/json'}),
      params: params
    };

    let token: string = this.getToken();  
    if (token) {
      options.headers.set('Authorization', `Bearer ${token}`)
    }

    return new RequestOptions(options);
  }

  private getUrl(table: string): string {
    return `${this.config.baseUrl}${table}`;
  }

  private mapHandler(res: Response, def: any = []): any {
    return (res.ok && res.text()) ? res.json() : def;
  }

  public get(table: string, params: PrestUrlParams): Observable<any> {
    return this.http.get(this.getUrl(table), this.getRequestOptions(params))
      .map((response: Response) => this.mapHandler(response)[0]||{});
  }

  public list(table: string, params?: PrestUrlParams): Observable<any> {
    return this.http.get(this.getUrl(table), this.getRequestOptions(params))
      .map((response: Response) => this.mapHandler(response));
  }

  public update(table: string, params: PrestUrlParams, data: any): Observable<any> {
    return this.http.patch(this.getUrl(table), data, this.getRequestOptions(params))
      .map((response: Response) => this.mapHandler(response));
  }

  public create(table: string, data: any, params?: PrestUrlParams): Observable<any> {
    return this.http.post(this.getUrl(table), data, this.getRequestOptions(params))
      .map((response: Response) => this.mapHandler(response, {}));
  }

  public delete(table: string, params: PrestUrlParams): Observable<any> {
    return this.http.delete(this.getUrl(table), this.getRequestOptions(params))
      .map((response: Response) => this.mapHandler(response, {}));
  }

  public customQuery(type: string, url: string, data?: any): Observable<any> {
    let result: any;

    switch (type.toLowerCase()) {
      case ('get'):
        result = this.http.get(url, this.getRequestOptions())
          .map((response: Response) => this.mapHandler(response));
        break;

      case ('put' || 'patch'):
        result = this.http.patch(url, data, this.getRequestOptions())
          .map((response: Response) => this.mapHandler(response, {}));
        break;

      case ('post'):
        result = this.http.post(url, data, this.getRequestOptions())
          .map((response: Response) => this.mapHandler(response, {}));
        break;

      case ('delete'):
        result = this.http.get(url, this.getRequestOptions())
          .map((response: Response) => this.mapHandler(response)[0] || {});
        break;
    }

    return result;
  }
}
