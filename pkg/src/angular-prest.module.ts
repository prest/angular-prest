import {
	NgModule,
	ModuleWithProviders
} from '@angular/core';

import { Http } from '@angular/http';
import { CommonModule } from '@angular/common';

import  { AngularPrestService } from './angular-prest.service';


@NgModule({
	imports: [
		CommonModule
	]
})
export class AngularPrestModule {
	static forRoot(config: any): ModuleWithProviders {
		return {
			ngModule: AngularPrestModule,
			providers: [
				AngularPrestService,
				{
					provide: 'config', useValue: config
				}
			]
		};
	}
}
