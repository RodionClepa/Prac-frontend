import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

export interface Transaction {
  cardId: string;
  amount: number;
  date: string;
  type: string;  // e.g., 'Groceries', 'Netflix', 'Spotify', 'Payday'
  isSpending: boolean;
}

@Component({
  selector: 'app-add-transactions',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-transactions.component.html',
  styleUrl: './add-transactions.component.scss'
})
export class AddTransactionsComponent {
  transactionForm: FormGroup;
  cards = [
    { id: '1', displayName: 'Visa ****1234' },
    { id: '2', displayName: 'Mastercard ****5678' },
  ];

  constructor(private fb: FormBuilder) {
    this.transactionForm = this.fb.group({
      cardId: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      date: ['', Validators.required],
      type: ['', Validators.required],
      isSpending: [true],
    });
   }

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
      const transaction: Transaction = this.transactionForm.value;
      console.log('New transaction added:', transaction);
      // Handle form submission logic, e.g., sending data to backend or state management
    }
  }
}
