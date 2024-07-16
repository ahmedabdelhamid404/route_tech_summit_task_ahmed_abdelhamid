export interface ICustomersResponse {
  customers: Customer[];
  transactions: Transaction[];
}

export interface Customer {
  id: number;
  name: string;
}

export interface Transaction {
  id: number;
  customer_id: number;
  date: Date;
  amount: number;
}
