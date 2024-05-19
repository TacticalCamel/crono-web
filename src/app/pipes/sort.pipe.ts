import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'sort',
    standalone: true
})
export class SortPipe implements PipeTransform {
    public transform(collection: any[], fieldName: string, descending: boolean) {
        return (collection || []).sort((a, b) => this.compare(a, b, fieldName, descending));
    }

    private compare(first: any, second: any, fieldName: string, descending: boolean) {
        let firstProp = first.hasOwnProperty(fieldName) ? first[fieldName] : null;
        let secondProp = second.hasOwnProperty(fieldName) ? second[fieldName] : null;

        if (typeof firstProp === 'string' && typeof secondProp === 'string') {
            firstProp = firstProp.toLowerCase();
            secondProp = secondProp.toLowerCase();
        }

        if (firstProp < secondProp) {
            return descending ? 1 : -1;
        }
        if (firstProp > secondProp) {
            return descending ? -1 : 1;
        }

        return 0;
    }
}