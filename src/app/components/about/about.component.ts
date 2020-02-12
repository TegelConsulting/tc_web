import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { ScrollService } from 'src/app/services/scrollService/scroll-service.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [
    trigger('fadeAnimation', [
      state('out', style({opacity: 0, transform: 'translateX(0)'})),
      state('in', style({opacity: 1, transform: 'translateX(30px)'})),
      transition('out => in',
        animate(800)
      )
    ]),
    trigger('about1', [
      state('out', style({opacity: 0, bottom: 0, right: 0, transform: 'scale(1) translate(0, 0)'})),
      state('in', style({opacity: 1, bottom: '50%', right: '50%', transform: 'scale(1) translate(50%, 50%)'})),
      transition('out => in', animate('0.6s 0.4s', keyframes([
        style({opacity: 1, offset: 0.2}),
        style({transform: 'scale(1.5)', offset: 0.4}),
        style({bottom: '50%', right: '50%', transform: 'scale(1) translate(50%, 50%)', offset: 1})
      ])))
    ]),
    trigger('about2', [
      state('out', style({opacity: 0, bottom: 0, right: '100%', transform: 'scale(1) translate(100%, 0)'})),
      state('in', style({opacity: 1, bottom: '50%', right: '50%', transform: 'scale(1) translate(50%, 50%)'})),
      transition('out => in', animate('0.6s 1s', keyframes([
        style({opacity: 1, offset: 0.2, transform: 'translate(100%, 0)'}),
        style({transform: 'scale(1.5) translate(100%, 0)', offset: 0.4}),
        style({bottom: '50%', right: '50%', transform: 'scale(1) translate(50%, 50%)', offset: 1})
      ])))
    ]),
    trigger('about3', [
      state('out', style({opacity: 0, top: 0, right: 0, transform: 'scale(1)'})),
      state('in', style({opacity: 1, top: '50%', right: '50%', transform: 'scale(1) translate(50%, 50%)'})),
      transition('out => in', animate('0.6s 1.6s', keyframes([
        style({opacity: 1, offset: 0.2}),
        style({transform: 'scale(1.5)', offset: 0.4}),
        style({top: '50%', right: '50%', transform: 'scale(1) translate(50%, 50%)', offset: 1})
      ])))
    ]),
    trigger('about4', [
      state('out', style({opacity: 0, top: 0, right: '100%', transform: 'scale(1) translate(100%, 0)'})),
      state('in', style({opacity: 1, top: '50%', right: '50%', transform: 'scale(1) translate(50%, 50%)'})),
      transition('out => in', animate('0.6s 2.2s', keyframes([
        style({opacity: 1, transform: 'translate(100%, 0)', offset: 0.2}),
        style({transform: 'scale(1.5) translate(100%, 0)', offset: 0.4}),
        style({top: '50%', right: '50%', transform: 'scale(1) translate(50%, 50%)', offset: 1})
      ])))
    ])
  ]
})
export class AboutComponent implements OnInit {
  startTransition = false;
  showabout = false;
  private scrollService: ScrollService;

  constructor(scrollService: ScrollService) {
    this.scrollService = scrollService;
  }

  ngOnInit() {
    this.scrollService.didScroll$.subscribe(didScroll => {
      // Check to see if element is in viewport
      const el = document.getElementById('about');
      this.startTransition = this.inViewport(el);
      if (this.startTransition) {
        this.showabout = true;
      }
    });
  }

  inViewport(el) {
    let r;
    let html;
    if ( !el || 1 !== el.nodeType ) { return false; }
    html = document.documentElement;
    r = el.getBoundingClientRect();

    return ( !!r
      && r.bottom >= 0
      && r.right >= 0
      && r.top < html.clientHeight
      && r.left <= html.clientWidth
    );
  }

}
