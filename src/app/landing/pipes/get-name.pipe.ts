import { Pipe, PipeTransform } from '@angular/core';

import * as fromModels from '../models';

@Pipe({
  name: 'getName',
  standalone: true,
})
export class GetNamePipe implements PipeTransform {
  transform(
    value: number | undefined,
    customers: fromModels.Customer[]
  ): string | undefined {
    return customers.find((customer) => customer?.id === value)?.name;
  }
}
