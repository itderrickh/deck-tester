import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'keyContains'
})
export class KeyContainsPipe implements PipeTransform {
    transform(items: Array<any>, name: string): Array<any> {
        if (name) {
            return items.filter(item => item.key && item.key.toLowerCase().indexOf(name.toLowerCase()) >= 0);
        } else {
            return items;
        }
    }
}
