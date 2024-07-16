import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import * as fromModels from '../models';

@Injectable()
export class CustomersService {
  constructor(private _http: HttpClient) {}

  getCustomers(): Observable<fromModels.ICustomersResponse> {
    return this._http.get<fromModels.ICustomersResponse>(
      'assets/customers.json'
    );
  }
}
