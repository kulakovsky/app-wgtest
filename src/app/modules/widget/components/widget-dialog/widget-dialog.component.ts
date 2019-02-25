import {
    AfterContentChecked,
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit, ChangeDetectionStrategy,
    Component,
    DoCheck, HostBinding, Inject,
    OnChanges,
    OnDestroy,
    OnInit, ViewEncapsulation
} from '@angular/core';
import {Item} from '../../models/item.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {combineLatest, Observable, Subject} from 'rxjs';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';

@Component({
    selector: 'app-widget-dialog',
    templateUrl: './widget-dialog.component.html',
    styleUrls: ['./widget-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false
})
export class WidgetDialogComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked,
    AfterViewInit, AfterViewChecked, OnDestroy {

    @HostBinding('class.app-widget-dialog') private isDialogClassUsed = true;

    items: Array<DialogItem> = [];

    selectedItems: Array<DialogItem> = [];

    initialItems: Array<DialogItem> = [];

    formGroup: FormGroup;

    filteredItems$: Observable<DialogItem[]>;

    filteredByTitle$: Observable<DialogItem[]>;

    filteredBySerialNumber$: Observable<DialogItem[]>;

    private destroy$ = new Subject();

    constructor(public dialogRef: MatDialogRef<WidgetDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {

        const items = data && data.items ? [...data.items] : [];

        this.selectedItems = items.map((item: DialogItem) => {

            return {...item, selected: true};

        });

    }

    trackById(index: number, { id }: { id: number }): number { return id; }

    close(): void {

        const items: Item[] = this.selectedItems.map((item: DialogItem) => {

            return {id: item.id, title: item.title };
        });

        this.dialogRef.close(items);
    }

    itemsGenerate() {

        const selectedItemsMap = this.selectedItems.reduce((result, selectedItem) => {

            result.set(selectedItem.id, selectedItem);

            return result;

        }, new Map());

        for (let i = 1; i <= 300; i++) {

            const item: DialogItem = {id: i, title: `Элемент ${i}`, selected: selectedItemsMap.has(i)};

            this.items.push(item);

            this.initialItems.push(item);

        }

    }

    toggleSelection(item: DialogItem) {

        item.selected = !item.selected ;

        if (item.selected ) {

            this.selectedItems = [...this.selectedItems, item];

        } else {

            const index = this.selectedItems.findIndex(value => value.id === item.id);

            this.selectedItems.splice(index, 1);
        }
    }

    deleteItem(item: DialogItem) {

        item.selected = false;

        const availableIndex = this.items.findIndex(value => value.id === item.id);

        this.items[availableIndex].selected = false;

        const index = this.selectedItems.findIndex(value => value.id === item.id);

        this.selectedItems.splice(index, 1);

    }

    private _filteredByTitle(title: string): DialogItem[] {

        const filterValue = title.toLowerCase();

        return this.items.filter(item => item.title.toLowerCase().includes(filterValue));
    }

    private _filteredBySerialNumber(serialNumber: number): DialogItem[] {

        this.items = this.initialItems;

        return this.items.filter((item) => item.id > serialNumber);
    }

    private initDataSources() {

        const titleCtrl: AbstractControl = this.formGroup.get('titleCtrl');

        const valueCtrl: AbstractControl = this.formGroup.get('valueCtrl');

        this.filteredByTitle$ = titleCtrl.valueChanges
            .pipe(
                startWith<string>(''),
                map(title => title ? this._filteredByTitle(title) : this.items.slice())
            );

        this.filteredBySerialNumber$ = valueCtrl.valueChanges
            .pipe(
                startWith<string>(''),
                map(serialNumber => serialNumber ? this._filteredBySerialNumber(+serialNumber) : this.items),
            );

        this.filteredItems$ = combineLatest(this.filteredByTitle$, this.filteredBySerialNumber$).pipe(

            map(([filteredByTitle, filteredBySerialNumber]: [DialogItem[], DialogItem[]]): DialogItem[] => {

                return this.intersection(filteredByTitle, filteredBySerialNumber);
            }),
        );

    }

    private initFormGroup() {

        this.formGroup = new FormGroup({

            titleCtrl: new FormControl(null),

            valueCtrl: new FormControl(null),
        });
    }

    private intersection(filteredFirstArray: DialogItem[], filteredSecondArray: DialogItem[]) {

        return [...new Set(filteredFirstArray)].filter(x => new Set(filteredSecondArray).has(x));
    }


    // lifecycle hooks ---------------------------------------------------------------------------------------------------------------------

    ngOnChanges(/*changes: SimpleChanges*/): void {

        // console.log(`${this.constructor.name}: ngOnChanges`);
    }

    ngOnInit(): void {

        this.itemsGenerate();

        this.initFormGroup();

        this.initDataSources();

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

        this.destroy$.next();

        this.destroy$.unsubscribe();

        // console.log(`${this.constructor.name}: ngAfterViewChecked`);
    }

}

export interface DialogItem {
    id: number;
    title: string;
    selected: boolean;
}

export interface DialogData {
    items: Item[];
}
