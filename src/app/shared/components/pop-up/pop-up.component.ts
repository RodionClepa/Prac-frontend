import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.scss'
})
export class PopUpComponent {
  @Output() closeModal = new EventEmitter<void>();

  @Input() maxWidth: string = '600px';
  @Input() width: string = '100%';

  @Input() maxHeight: string = '600px';
  @Input() height: string = '100%';

  @Input() overflowX: string = "auto";
  @Input() overflowY: string = "auto";

  ngOnInit() {
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.closeModal.emit();
  }
}
