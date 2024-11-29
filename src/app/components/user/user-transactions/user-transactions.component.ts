import { Component } from '@angular/core';
import { TransactionComponent } from './transaction/transaction.component';
import { ClientService } from '../../../shared/services/client.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PopUpComponent } from '../../../shared/components/pop-up/pop-up.component';

@Component({
  selector: 'app-user-transactions',
  standalone: true,
  imports: [TransactionComponent, FormsModule, PopUpComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './user-transactions.component.html',
  styleUrl: './user-transactions.component.scss'
})
export class UserTransactionsComponent {

  transactionForm: FormGroup;
  constructor(private clientService: ClientService, private fb: FormBuilder) {
    this.transactionForm = this.fb.group({
      id: [-1],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      description: [''],
      type: ['', Validators.required],
      isExpense: [true],
    });
  }

  transactions: any = [];

  ngOnInit() {
    this.getData();
  }

  getData() {
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


  isEditPopupOpen: boolean = false;
  openEditPopup(transaction: any) {
    console.log(this.isEditPopupOpen)
    this.isEditPopupOpen = true;
    this.transactionForm.patchValue({
      ...transaction
    })
    console.log(this.isEditPopupOpen)
  }

  onSubmit() {
    this.clientService.putTransaction(this.transactionForm.value).subscribe({
      next: (response) => {
        console.log(response);
        this.isEditPopupOpen = false;
        this.getData();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  onDelete(transaction: any) {
    console.log("onDelete")
    this.clientService.deleteTransaction(transaction.id).subscribe({
      next: (response) => {
        console.log(response);
        this.getData();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
