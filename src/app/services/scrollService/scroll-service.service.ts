import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  private didScroll = new Subject<boolean>();

  didScroll$ = this.didScroll.asObservable();

  constructor() {
    console.log('Register scroll event');
    window.addEventListener('scroll', this.scroll, true);
  }

  scroll = (): void => {
    console.log('Scroll happended');
    this.didScroll.next(true);
  }
}
