import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fixlength'
})
export class FixlengthPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    if(value.length > 15){      
      return value.substring(0,15).trim() + "..."
    }else{
      return value;
    }
  }

}
