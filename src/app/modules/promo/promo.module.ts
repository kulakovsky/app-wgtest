import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PromoComponent} from './components/promo/promo.component';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [PromoComponent],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class PromoModule {
}
