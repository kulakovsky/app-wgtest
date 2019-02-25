import {
    AfterContentChecked,
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    DoCheck, HostBinding,
    OnChanges,
    OnDestroy,
    OnInit, ViewContainerRef, ViewEncapsulation
} from '@angular/core';
import {MatDialog} from '@angular/material';
import {WidgetDialogComponent} from '../widget-dialog/widget-dialog.component';
import {Item} from '../../models/item.model';
import {filter, switchMap, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-widget',
    templateUrl: './widget.component.html',
    styleUrls: ['./widget.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false
})
export class WidgetComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked,
    AfterViewInit, AfterViewChecked, OnDestroy {

    items: Array<Item> = [];

    private destroy$ = new Subject();

    @HostBinding('class.app-widget') private isDialogClassUsed = true;

    constructor(protected dialogService: MatDialog, private changeDetectorRef: ChangeDetectorRef) {
    }

    onWidgetDialogButtonClick(): void {

        this.openWidgetDialogButtonClick();
    }

    openWidgetDialogButtonClick(): void {

        const data = { items: this.items };

        this.dialogService.open(WidgetDialogComponent, { data }).afterClosed()
            .pipe(
                takeUntil(this.destroy$),
                filter(item => item)
            )
            .subscribe((items) => {

                this.items = items;

                this.changeDetectorRef.detectChanges();
            });

    }

    onDeleteItemButtonClick(item: Item) {

        const i = this.items.findIndex(value => value.id === item.id);

        this.items.splice(i, 1);

    }


    // lifecycle hooks ---------------------------------------------------------------------------------------------------------------------

    ngOnChanges(/*changes: SimpleChanges*/): void {

        // console.log(`${this.constructor.name}: ngOnChanges`);
    }

    ngOnInit(): void {

        // console.log(`${this.constructor.name}: ngOnInit`);
    }

    ngDoCheck(): void {

        // console.log(`${this.constructor.name}: ngDoCheck`);
    }

    ngAfterContentInit(): void {

        // console.log(`${this.constructor.name}: ngAfterContentInit`);
    }

    ngAfterContentChecked(): void {

        // console.log(`${this.constructor.name}: ngAfterContentChecked`);
    }

    ngAfterViewInit(): void {

        // console.log(`${this.constructor.name}: ngAfterViewInit`);
    }

    ngAfterViewChecked(): void {

        // console.log(`${this.constructor.name}: ngAfterViewChecked`);
    }

    ngOnDestroy(): void {

        // console.log(`${this.constructor.name}: ngAfterViewChecked`);

        this.destroy$.next();

        this.destroy$.unsubscribe();
    }

}
