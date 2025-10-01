import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
  OnDestroy
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[appDebounceClick]',
  standalone: false
})
export class DebounceClick implements OnDestroy {
  @Input() debounceTime = 500;
  @Output() appDebounceClick = new EventEmitter();
  
  private clicks = new Subject<Event>();
  private subscription: Subscription;

  constructor() {
    this.subscription = this.clicks
      .pipe(debounceTime(this.debounceTime))
      .subscribe(e => this.appDebounceClick.emit(e));
  }

  @HostListener('click', ['$event'])
  clickEvent(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
