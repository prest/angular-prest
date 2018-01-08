import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PrestConfig } from './angular-prest.config';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';

/**
 * Type of url params that can be passed to pRest
 */
export declare type PrestUrlParams = string | { [name: string]: string } | null;

/**
 * Type accepted for the request
 */
export declare type PrestRequestMethod = 'POST' | 'PUT' | 'PATH' | 'DELETE' | 'GET';

/**
 * AngualrPrestService is responsible to manage all requests
 * between the Angular aplication and the pRest API
 */
@Injectable()
export class AngularPrestService {

  constructor( private http: HttpClient, @Inject('config') private config: PrestConfig) {
    if (this.config.baseUrl.substr(-1) !== '/') {
      this.config.baseUrl += '/';
    }    
  }

  /**
   * Get the token stored inside local storage
   * @returns string
   */
  private _getToken(): string {
    let data = JSON.parse(localStorage.getItem(this.config.localStorageData) || '{}');
    return data[this.config.tokenPath];
  }

  /**
   * Create the request options
   * @param params PrestUrlParams
   * @returns object
   */
  private _getRequestOptions(params?: PrestUrlParams): any {
    const options: any = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    if (params) {
        options['params'] = params;
    }

    let token: string = this._getToken();  
    if (token) {
        options.headers = options.headers.append('Authorization', `Bearer ${token}`);
    }

    return options;
  }

  /**
   * Create a URL to make the request
   * @param table string
   * @returns string
   */
  private _getUrl(table: string): string {
    return `${this.config.baseUrl}${table}`;
  }

  /**
   * Make GET request and return only one row of data or null
   * @param table string
   * @param params PrestUrlParams
   * @returns Observable<any>
   */
  public get(table: string, params: PrestUrlParams): Observable<any> {
    return this.http.get(this._getUrl(table), this._getRequestOptions(params))
                    .map((response: any) => response[0] || {});
  }

  /**
   * Make GET request and returns a list of data or null
   * @param table string
   * @param params PrestUrlParams
   * @returns Observable<any>
   */
  public list(table: string, params?: PrestUrlParams): Observable<any> {
    return this.http.get(this._getUrl(table), this._getRequestOptions(params));
  }

  /**
   * Make PATCH request and return the object updated
   * @param table string
   * @param data any
   * @param params PrestUrlParams
   * @returns Observable<any>
   */
  public update(table: string, data: any, params: PrestUrlParams): Observable<any> {
    return this.http.patch(this._getUrl(table), data, this._getRequestOptions(params));
  }

  /**
   * Make POST request and return the server response or empty
   * @param table string
   * @param data any
   * @param params PrestUrlParams
   * @returns Observable<any>
   */
  public create(table: string, data: any, params?: PrestUrlParams): Observable<any> {
    return this.http.post(this._getUrl(table), data, this._getRequestOptions(params))
                    .map((response: any) => response || {});
  }

  /**
   * Make DELETE request and return the server response or empty
   * @param table string
   * @param params PrestUrlParams
   * @returns Observable<any>
   */
  public delete(table: string, params: PrestUrlParams): Observable<any> {
    return this.http.delete(this._getUrl(table), this._getRequestOptions(params))
                    .map((response: any) => response || {});
  }

  /**
   * Create a custom query and send to the server
   * @param type PrestRequestMethod
   * @param url string
   * @param data any
   * @returns Observable<any>
   */
  public customQuery(type: PrestRequestMethod, url: string, data?: any): Observable<any> {
    switch (type.toLowerCase()) {
      case ('get'): {
        return this.http.get(url, this._getRequestOptions())
                        .map((response: any) => response || {});
      }

      case ('put'): {
        return this.http.put(url, data, this._getRequestOptions())
                        .map((response: any) => response || {});
      }

      case ('patch'): {
        return this.http.patch(url, data, this._getRequestOptions())
                        .map((response: any) => response || {});
      }

      case ('post'): {
        return this.http.post(url, data, this._getRequestOptions())
                        .map((response: any) => response || {});
      }

      case ('delete'): {
        return this.http.get(url, this._getRequestOptions())
                        .map((response: any) => response[0] || {});
      }

      default: {
        return Observable.create(
          (observer: Observer<any>) => observer.error(new Error('Method not implemented'))
        );
      }
    }
  }
}
