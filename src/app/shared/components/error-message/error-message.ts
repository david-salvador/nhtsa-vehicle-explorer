import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error-message',
  standalone: false,
  templateUrl: './error-message.html',
  styleUrl: './error-message.scss'
})
export class ErrorMessage {

  @Input() message = 'An error occurred';
  @Input() showRetry = true;
  @Output() retry = new EventEmitter<void>();

  onRetry(): void {
    this.retry.emit();
  }
}
