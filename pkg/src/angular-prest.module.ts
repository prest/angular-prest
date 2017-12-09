import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AngularPrestService } from './angular-prest.service';
import { PrestConfig } from './angular-prest.config';

@NgModule({
	imports: [CommonModule, HttpClientModule]
})
export class AngularPrestModule {
	/**
	 * set configurations to the module
	 * @param config PrestConfig
	 */
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
