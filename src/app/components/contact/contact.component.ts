import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { ScrollService } from 'src/app/services/scrollService/scroll-service.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  animations: [
    trigger('fadeAnimation', [
      state('out', style({opacity: 0, transform: 'translateX(0)'})),
      state('in', style({opacity: 1, transform: 'translateX(30px)'})),
      transition('out => in',
        animate('1s')
      )
    ]),
    trigger('buttonvalid', [
      state('out', style({backgroundColor: 'rgba(239, 239, 239, 0.3)'})),
      state('in', style({backgroundColor: 'forestgreen'})),
      transition('out <=> in', animate(300))
    ])
  ]
})
export class ContactComponent implements OnInit {
  startTransition = false;
  messageSend = false;
  messageError = false;
  sending = false;
  private scrollService: ScrollService;
  private formBuilder: FormBuilder;

  public contactForm: FormGroup;

  get name() { return this.contactForm.get('name'); }
  get email() { return this.contactForm.get('email'); }
  get message() { return this.contactForm.get('message'); }

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

    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: [''],
      message: ['', Validators.required]
    });
  }

  async sendMessage() {
    const mail = {
        email: this.contactForm.value.email,
        name: this.contactForm.value.name,
        message: this.contactForm.value.message,
        phone: this.contactForm.value.phone
    };

    this.sending = true;
    // Send mail through azure api
    const response = await fetch('https://tc-sendmail.azurewebsites.net/sendmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mail)
    });

    this.sending = false;
    if (response.ok) {
      this.messageSend = true;
    } else {
      this.messageError = true;
    }
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
