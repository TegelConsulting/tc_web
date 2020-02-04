import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ScrollService } from 'src/app/services/scrollService/scroll-service.service';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
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
export class ContactComponent implements OnInit {
  startTransition = false;
  private scrollService: ScrollService;
  private formBuilder: FormBuilder;

  contactForm = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
    message: new FormControl()
  });

  constructor(scrollService: ScrollService, formBuilder: FormBuilder) {
    this.scrollService = scrollService;
    this.formBuilder = formBuilder;
  }

  ngOnInit() {
    this.scrollService.didScroll$.subscribe(didScroll => {
      // Check to see if element is in viewport
      const el = document.getElementById('contact');
      this.startTransition = this.inViewport(el);
    });

    this.formBuilder.group({

    });
  }

  sendMessage() {
    console.log('Send information to admin: ', this.contactForm.value);

    // Send mail through azure api
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
