import { Component, Input } from '@angular/core';

export interface Transaction {
  title: string;
  date: string;
  amount: number;
}

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss'
})
export class TransactionComponent {
  @Input() transaction!: Transaction;
}
