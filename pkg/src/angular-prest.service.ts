import {
  Injectable
} from '@angular/core';

import { 
  Http, 
  Response,
  RequestOptions,
  Headers
} from '@angular/http';

import {
  Observable
} from 'rxjs';
import 'rxjs/add/operator/map';


@Injectable()
export class AngularPrestService {

  constructor(
    private http: Http,
    private config: any
  ) { }

  getToken (): string {
    let data = JSON.parse(localStorage.getItem(this.config.localStorageData) || '{}');
    return data[this.config.tokenPath];
  }
  
  getHttpHeaders(): RequestOptions {
    let token: string = this.getToken();
    let headers: any = {
      'Content-Type': 'application/json'
    };
    if (token) headers['Authorization'] = 'Bearer ' + token;

    return new RequestOptions({  headers: new Headers(headers) });
  }

  getUrl (table: string, params?: string): string {
    let url = this.config.baseUrl + table;
    if (params) url += '?' + params;
    return url;
  }

  get (table: string, params: string):  Observable<any> {
    return this.http.get(this.getUrl(table, params), this.getHttpHeaders())
      .map((response: Response) => {
        let data = response.text() ? response.json()[0] : {};
        return data;
      });
  }

  list (table: string, params?: string): Observable<any> {
    return this.http.get(this.getUrl(table, params), this.getHttpHeaders())
      .map((response: Response) => {
        let data = response.text() ? response.json() : [];
        return data;
      });
  }

  update (table: string, params: string, data: any): Observable<any>  {
    return this.http.patch(this.getUrl(table, params), data, this.getHttpHeaders())
      .map((response: Response) => {
        let data = response.text() ? response.json() : [];
        return data;
      });
  }
  
  create (table: string, data: any, params?: string): Observable<any> {
    return this.http.post(this.getUrl(table, params), data, this.getHttpHeaders())
      .map((response: Response) => {
        let data = response.text() ? response.json() : {};
        return data;
      });
  }

  delete (table: string, params: string): Observable<any>  {
    return this.http.delete(this.getUrl(table, params), this.getHttpHeaders())
      .map((response: Response) => {
        let data = response.text() ? response.json() : {};
        return data;
      });
  }

  customQuery (type: string, url: string, data?: any) : Observable<any>  {
    let result: any;

    switch (type.toLowerCase()) {
      case ('get'):
        result = this.http.get(url, this.getHttpHeaders())
          .map((response: Response) => {
            let data = response.text() ? response.json() : [];
            return data;
          });
        break;

      case ('put' || 'patch'):
        result = this.http.patch(url, data, this.getHttpHeaders())
          .map((response: Response) => {
            let data = response.text() ? response.json() : {};
            return data;
          });
        break;

      case ('post'):
        result = this.http.post(url, data, this.getHttpHeaders())
          .map((response: Response) => {
            let data = response.text() ? response.json() : {};
            return data;
          });
        break;

      case ('delete'):
        result = this.http.get(url, this.getHttpHeaders())
          .map((response: Response) => {
            let data = response.text() ? response.json()[0] : {};
            return data;
          });
        break;
    }

    return result;
  }

}
