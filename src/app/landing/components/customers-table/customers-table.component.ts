import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as fromModels from '../../models';
import * as fromComponents from '../../components';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customers-table',
  templateUrl: './customers-table.component.html',
  styleUrl: './customers-table.component.scss',
})
export class CustomersTableComponent implements OnInit, OnDestroy {
  constructor(private _dialog: NgbModal, private _fb: FormBuilder) {}

  form!: FormGroup;

  isFormDirty: boolean = false;

  private _formSubscription: Subscription = new Subscription();

  private _customersDataRef!: fromModels.ICustomersResponse;

  customersData!: fromModels.ICustomersResponse;

  @Input()
  set customers(value: fromModels.ICustomersResponse | null) {
    if (value) {
      this._customersDataRef = JSON.parse(JSON.stringify(value));
      this.customersData = value;
    }
  }

  get filterTypeControl() {
    return this.form?.get('filterType');
  }

  get valueControl() {
    return this.form?.get('value');
  }

  ngOnInit(): void {
    this.setupForm();
  }

  setToLocalStorage() {}

  openChartModal(customer: fromModels.Transaction) {
    const customerDetails = this.customersData?.customers.find(
      (val) => val?.id === customer.customer_id
    );

    const dialogRef = this._dialog.open(fromComponents.ChartDialogComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      windowClass: 'modal-lg',
    });

    dialogRef.componentInstance.customer = customerDetails;
    dialogRef.componentInstance.transaction = customer;
  }

  setupForm() {
    this.form = this._fb.group({
      filterType: ['1'],
      value: [''],
    });

    this._formSubscription = this.form.valueChanges.subscribe((val) => {
      if (val.value) {
        this.isFormDirty = true;
      } else {
        this.isFormDirty = false;
      }
    });
  }

  filterByName() {
    if (this.valueControl?.value) {
      const customerIds: number[] = [];
      this._customersDataRef?.customers.map((val) => {
        if (
          val?.name
            .toLowerCase()
            .includes(this.valueControl?.value.toLowerCase())
        ) {
          customerIds.push(val?.id);
        }
      });

      const filteredTransactions = this._customersDataRef?.transactions.filter(
        (val) => {
          return customerIds.includes(val?.customer_id);
        }
      );

      this.customersData.transactions = [...filteredTransactions];
    } else {
      this.customersData.transactions = [
        ...this._customersDataRef?.transactions,
      ];
    }
  }

  filterByTransaction() {
    if (this.valueControl?.value) {
      const filteredTransactions = this._customersDataRef?.transactions.filter(
        (val) => {
          return val?.amount <= this.valueControl?.value;
        }
      );

      this.customersData.transactions = [...filteredTransactions];
    } else {
      this.customersData.transactions = [
        ...this._customersDataRef?.transactions,
      ];
    }
  }

  onSubmit() {
    if (this.filterTypeControl?.value === '1') {
      this.filterByTransaction();
    } else if (this.filterTypeControl?.value === '2') {
      this.filterByName();
    }
  }

  resetForm() {
    this.valueControl?.patchValue('');
    this.filterTypeControl?.patchValue('1');
    this.onSubmit();
  }

  ngOnDestroy(): void {
    this._formSubscription.unsubscribe();
  }
}
