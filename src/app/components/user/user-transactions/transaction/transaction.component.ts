import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface Transaction {
  description: string;
  date: string;
  amount: number;
  isExpense: boolean;
  type: string;
}

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss'
})
export class TransactionComponent {
  @Input() transaction!: Transaction;
}
