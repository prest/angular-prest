import {
  Headers,
  RequestOptions
} from '@angular/http';

export function getToken (config: any): string {
  let data = JSON.parse(localStorage.getItem(config.localStorageData) || '{}');
  return data[config.tokenPath];
}

export function getHttpHeaders(): RequestOptions {
  let token = this.getToken();
  let authHeaders: Headers  = new Headers({
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  });
  return new RequestOptions({  headers: authHeaders });
}