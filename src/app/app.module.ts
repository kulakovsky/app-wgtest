import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {PromoComponent} from './modules/promo/components/promo/promo.component';
import {RouterModule} from '@angular/router';
import {PromoModule} from './modules/promo/promo.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        PromoModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([
            {
                path: '',
                component: PromoComponent
            },
            {
                path: 'search',
                loadChildren: 'src/app/modules/search/search.module#SearchModule'
            },
            {
                path: 'list',
                loadChildren: 'src/app/modules/list/list.module#ListModule'
            },
            {
                path: 'article',
                loadChildren: 'src/app/modules/article/article.module#ArticleModule'
            },
            {
                path: 'widget',
                loadChildren: 'src/app/modules/widget/widget.module#WidgetModule'
            }
        ])
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
