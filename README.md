<p align="center">
  <h1 align="center">Angular pREST</h1>
  <p align="center">It is a wrapper service to use with pREST API.</p>
  <p align="center">NPM: https://www.npmjs.com/package/angular-prest</p>
</p>

## What is pREST?

- A fully RESTful API from any existing PostgreSQL database written in Go http://postgres.rest.

## Install

```bash
npm install angular-prest --save
```

## Example use:

You need to provide config data to the angular-prest service. Just import AngularPrestModule and put it in "imports" passing your config data to forRoot().

Ex:

yours app.module.ts

```
import { AngularPrestModule } from 'angular-prest';
```

and put AngularPrestModule in imports:

ex:
```
{
  ...
  imports: [
    AngularPrestModule.forRoot({
      localStorageData: 'the-localstorage-keyword',
      tokenPath: 'path-to-token',
      baseUrl: 'the-base-prest-service-url'
    })
  ]
  ...
}
```

that is all you need, now you can import the AngularPrestService in yours components angular and use it. o/

ex:

component example!
```
import { Component } from '@angular/core';

import { AngularPrestService } from 'angular-prest';


@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent {

  constructor(
    private prestService: AngularPrestService
  ) { }

  ...

}
```
