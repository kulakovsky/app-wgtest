import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WidgetComponent} from './components/widget/widget.component';
import {RouterModule} from '@angular/router';
import { WidgetDialogComponent } from './components/widget-dialog/widget-dialog.component';
import {
    MatButtonModule, MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { SuffixPipe } from './pipes/suffix.pipe';

@NgModule({
    declarations: [WidgetComponent, WidgetDialogComponent, SuffixPipe],
    entryComponents: [WidgetComponent, WidgetDialogComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: WidgetComponent
            }
        ]),

        // Angular material modules

        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatCheckboxModule,

        FormsModule,
        ReactiveFormsModule,
    ]
})
export class WidgetModule {
}
