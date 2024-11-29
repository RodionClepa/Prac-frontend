import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClientService } from '../../../../shared/services/client.service';

export interface Transaction {
  description: string;
  date: string;
  amount: number;
  isExpense: boolean;
  type: string;
  id: number;
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

  @Output() emitEdit = new EventEmitter<any>();
  @Output() deleteEmit = new EventEmitter<any>();

  constructor(private clientService: ClientService) {}

  onEdit() {
    console.log("onEdit")
    this.emitEdit.emit(this.transaction);
  }

  onDelete() {
    this.deleteEmit.emit(this.transaction);
  }
}
