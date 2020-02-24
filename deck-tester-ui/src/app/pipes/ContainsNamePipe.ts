import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'containsName'
})
export class ContainsNamePipe implements PipeTransform {
    transform(items: Array<any>, name: string): Array<any> {
        if (name) {
            return items.filter(item => item.name.toLowerCase().indexOf(name.toLowerCase()) > -1);
        } else {
            return items;
        }
    }
}
