import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import * as fromServices from '../../services';
import * as fromModels from '../../models';

@Component({
  selector: 'app-custstomers-container',
  templateUrl: './custstomers-container.component.html',
  styleUrl: './custstomers-container.component.scss',
})
export class CuststomersContainerComponent implements OnInit, OnDestroy {
  private _customerService = inject(fromServices.CustomersService);

  ngOnInit(): void {}

  customers$: Observable<fromModels.ICustomersResponse | null> =
    this._customerService.getCustomers().pipe();

  ngOnDestroy(): void {}
}
