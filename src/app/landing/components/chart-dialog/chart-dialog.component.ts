import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import * as fromModels from '../../models';

@Component({
  selector: 'app-chart-dialog',
  templateUrl: './chart-dialog.component.html',
  styleUrl: './chart-dialog.component.scss',
})
export class ChartDialogComponent implements OnInit {
  constructor(private _modal: NgbActiveModal) {}

  @Input() customer!: fromModels.Customer;
  @Input() transaction!: fromModels.Transaction;

  barChartData: any;
  barChartOptions: any;

  ngOnInit(): void {
    this.barChartData = {
      labels: [`Customer ${this.customer?.name}`],
      datasets: [
        {
          label: `Cutomer ${this.customer?.name} Transactions`,
          data: [`${this.transaction?.amount}`],
          fill: false,
          backgroundColor: 'rgb(75, 192, 192)',
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };

    this.barChartOptions = {
      type: 'line',

      options: {
        animations: {
          tension: {
            duration: 1000,
            easing: 'linear',
            from: 1,
            to: 0,
            loop: true,
          },
        },
      },
      scales: {
        y: {
          min: 0,
          max: Number(`${this.transaction?.amount + 100}`),
        },
      },
    };
  }

  closeModal() {
    this._modal.close();
  }
}
