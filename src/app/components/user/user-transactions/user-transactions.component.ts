import { Component } from '@angular/core';
import { TransactionComponent } from './transaction/transaction.component';

@Component({
  selector: 'app-user-transactions',
  standalone: true,
  imports: [TransactionComponent],
  templateUrl: './user-transactions.component.html',
  styleUrl: './user-transactions.component.scss'
})
export class UserTransactionsComponent {

}
