import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    @HostBinding('class.app-search') private isDefaultClassUsed = true;

    constructor() {
    }

    ngOnInit() {
    }

}
