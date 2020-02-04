import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ScrollService } from 'src/app/services/scrollService/scroll-service.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [
    trigger('fadeAnimation', [
      state('out', style({opacity: 0})),
      state('in', style({opacity: 1, paddingLeft: '30px'})),
      transition('out => in',
        animate(800)
      )
    ])
  ]
})
export class AboutComponent implements OnInit {
  startTransition = false;
  private scrollService: ScrollService;

  constructor(scrollService: ScrollService) {
    this.scrollService = scrollService;
  }

  ngOnInit() {
    this.scrollService.didScroll$.subscribe(didScroll => {
      // Check to see if element is in viewport
      const el = document.getElementById('about');
      this.startTransition = this.inViewport(el);
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
      && r.top <= html.clientHeight
      && r.left <= html.clientWidth
    );
}

}
