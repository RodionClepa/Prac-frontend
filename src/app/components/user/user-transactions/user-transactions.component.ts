import { Component } from '@angular/core';
import { TransactionComponent } from './transaction/transaction.component';
import { ClientService } from '../../../shared/services/client.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-transactions',
  standalone: true,
  imports: [TransactionComponent, FormsModule],
  templateUrl: './user-transactions.component.html',
  styleUrl: './user-transactions.component.scss'
})
export class UserTransactionsComponent {
  constructor(private clientService: ClientService) {}

  transactions: any = [];

  ngOnInit() {
    this.clientService.getTransaction().subscribe({
      next: (response: any) => {
        console.log(response);
        this.transactions = response.content;
        this.getTypes();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  options: any = [];

  getTypes() {
    this.clientService.getTypes().subscribe({
      next: (response) => {
        console.log(response);
        this.options = response;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }


  selectedCategory: string = '';
  selectedTransactionType: string = '';
  onCategoryChange(): void {
    console.log('Selected Category:', this.selectedCategory);
  }

  onTransactionTypeChange(): void {
    console.log('Selected Transaction Type:', this.selectedTransactionType);
  }
  
}
