import { Directive } from '@angular/core';

@Directive({
  selector: '[appDebounceClick]',
  standalone: false
})
export class DebounceClick {

  constructor() { }

}
