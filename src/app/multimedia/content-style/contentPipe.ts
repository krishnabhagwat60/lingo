import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'departure'
})
export class ContentPipe implements PipeTransform {
  transform(value: any[], selected: Array<any>): any {
    value = value.filter(item => {
      if (item.value === selected[1]) {
        return item;
      } else {
        const selectedArray = selected[0];
        const selectedArrayValue = [];
        if (selectedArray.length > 0) {
          for (let i = 0; i < selectedArray.length; i++) {
            let selectedValueObject = selectedArray[i];
            let selectedValue = selectedValueObject.value;
            selectedArrayValue.push(selectedValue);
          }
          if (!selectedArrayValue.includes(item.value)) {
            return item;
          }
        } else {
          return item;
        }
      }
    });
    return value;
  }
}