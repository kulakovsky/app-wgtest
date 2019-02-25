import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'suffix'
})
export class SuffixPipe implements PipeTransform {

    transform(value: any, args?: any): any {

        let suffix;

        switch (value) {
            case 0:
                suffix = `${value} элементов`;
                break;
            case 1:
                suffix = `${value} элемент`;
                break;
            case 2:
                suffix = `${value} элемента`;
                break;
            case 3:
                suffix = `${value} элемента`;
                break;
        }

        return suffix;
    }

}
