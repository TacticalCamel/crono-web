import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'search',
    standalone: true
})
export class SearchPipe implements PipeTransform {
    public transform(collection: any[], fieldName: string, searchTerm: string) {
        if (!searchTerm) {
            return collection;
        }

        return (collection || []).filter(item => item.hasOwnProperty(fieldName) && new RegExp(searchTerm, 'gi').test(item[fieldName]));
    }
}