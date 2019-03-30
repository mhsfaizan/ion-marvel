import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (args) {
      return value.filter(o => {
        let name
        if(o.name){
          name = o.name.toLowerCase();
        }else if(o.title){          
          name = o.title.toLowerCase();
        }else if(o.firstName){
          name = o.firstName.toLowerCase();
        }
        let oSearch = args.toLowerCase();
        if (name.includes(oSearch)) {
          return true;
        } else {
          return false;
        }
      })
    }
    return value;
  }

}
