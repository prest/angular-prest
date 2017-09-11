# angular-prest
pREST component for Angular



<p align="center">
  <h1 align="center">Angular Prest</h1>
  <p align="center">It is a wrapper service to use with Prest API.</p>
</p>

## What is Prest?

- A fully RESTful API from any existing PostgreSQL database written in Go http://postgres.rest.

## Install

```bash
npm install 
```

## Example use:

You need to create a provider file to provide config data to the angular-prest service.

ex: prest.provider.ts

```ts
import { Http } from '@angular/http';

import { AngularPrestService } from '@prest/angular-prest';

const prestConfig = {
  localStorageData: 'the-localstorage-keyword',
  tokenPath: 'path-to-token',
  baseUrl: 'the-base-prest-service-url'
}

export function AngularPrestServiceFactory(http: Http) {
  return new AngularPrestService(http, prestConfig);
}

export let AngularPrestServiceProvider = {
  provide: AngularPrestService,
  useFactory: AngularPrestServiceFactory,
  deps: [Http]
};
```

After that, just import AngularPrestServiceProvider in your app.module, this way:

```ts
import { AngularPrestServiceProvider } from './prest.provider';
```

and put in providers:

ex:
```ts
{
  ...
  providers: [
    AngularPrestServiceProvider
  ]
  ...
}
```