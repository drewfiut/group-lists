import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currentID'
})
export class CurrentIDPipe implements PipeTransform {

  transform(value: unknown[], ...args: unknown[]): unknown {
    return value.filter(item => (item != args[0]));
  }

}
