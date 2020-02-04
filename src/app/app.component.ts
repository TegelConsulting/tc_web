import { Component } from '@angular/core';
import { ScrollService } from './services/scrollService/scroll-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tegel Consulting';

  constructor(scrollService: ScrollService) {
  }
}
