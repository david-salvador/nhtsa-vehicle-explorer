import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search-input',
  standalone: false,
  templateUrl: './search-input.html',
  styleUrl: './search-input.scss'
})
export class SearchInput implements OnInit, OnDestroy {
  @Input() placeholder = 'Search...';
  @Input() debounceTime = 300;
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();

  searchControl = new FormControl('');
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    // Set initial value
    if (this.value) {
      this.searchControl.setValue(this.value, { emitEvent: false });
    }

    // Setup debounced search
    this.searchControl.valueChanges
      .pipe(
        debounceTime(this.debounceTime),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(value => {
        this.valueChange.emit(value || '');
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  clear(): void {
    this.searchControl.setValue('');
  }
}
