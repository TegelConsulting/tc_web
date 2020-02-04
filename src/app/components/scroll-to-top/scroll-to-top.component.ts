import { Component, OnInit } from '@angular/core';
import { ScrollService } from 'src/app/services/scrollService/scroll-service.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.css'],
  animations: [
    trigger('fadeAnimation', [
      state('in', style({opacity: 1})),
      transition(':enter', [
        style({opacity: 0}),
        animate(300)
      ]),
      transition(':leave',
        animate(300, style({opacity: 0})))
    ])
  ]
})
export class ScrollToTopComponent implements OnInit {
  show: boolean;

  private scrollService: ScrollService;

  constructor(scrollService: ScrollService) {
    this.scrollService = scrollService;
  }

  ngOnInit() {
    this.show = false;

    this.scrollService.didScroll$.subscribe(happened => {
      if (window.pageYOffset > 150) {
        this.show = true;
      } else {
        this.show = false;
      }
    });
  }

  scrollToTop() {
    scrollTo({ top: 0, behavior: 'smooth' });
  }

}
