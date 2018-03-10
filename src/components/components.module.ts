import { NgModule } from '@angular/core';
import { FiltersComponent } from './filters/filters';
import { ExportComponent } from './export/export';
@NgModule({
	declarations: [FiltersComponent,
    ExportComponent],
	imports: [],
	exports: [FiltersComponent,
    ExportComponent]
})
export class ComponentsModule {}
