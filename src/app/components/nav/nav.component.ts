import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  animations: []
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  scrollTo(id: string) {
    const scrollTarget = document.getElementById(id);
    console.log(scrollTarget);
    scrollTarget.scrollIntoView({behavior: 'smooth', block: 'start'});
  }
}
