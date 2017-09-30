import {
	NgModule,
	ModuleWithProviders
} from '@angular/core';

import { Http } from '@angular/http';
import { CommonModule } from '@angular/common';

import  { AngularPrestService } from './angular-prest.service';

export interface PrestConfig  {
	localStorageData: string;
	baseUrl: string;
	tokenPath: string;
}

@NgModule({
	imports: [
		CommonModule
	]
})
export class AngularPrestModule {
	static forRoot(config: PrestConfig): ModuleWithProviders {
		return {
			ngModule: AngularPrestModule,
			providers: [
				AngularPrestService,
				{ provide: 'config', useValue: config }
			]
		};
	}
}
