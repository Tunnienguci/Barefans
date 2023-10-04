import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse',
})
export class ReversePipe implements PipeTransform {
  // Reverse list posts to show newest post first
  transform(value: any[]): any[] {
    return value.reverse();
  }
}
