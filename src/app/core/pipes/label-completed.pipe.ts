import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'labelCompleted',
  standalone: true
})
export class LabelCompletedPipe implements PipeTransform {

  transform(value: boolean): string {
    return value ? 'Completed' : 'Pending';
  }

}
