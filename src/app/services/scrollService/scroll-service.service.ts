import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  private scroll = new Subject<boolean>();
  didScroll$ = this.scroll.asObservable();

  constructor() {
    console.log('Register scroll event');

    let timer = null;
    window.addEventListener('scroll', () => {
      if (timer !== null) {
          clearTimeout(timer);
      }
      timer = setTimeout(() => {
            this.scrollStopped();
      }, 500);
    }, false);
  }

  scrollStopped = (): void => {
    this.scroll.next(true);
  }
}
