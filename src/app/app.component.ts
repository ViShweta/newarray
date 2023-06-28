import { Component } from '@angular/core';
import { LocalService } from './localstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private storage :LocalService,
    private route: Router

  ) {
    let data = JSON.parse(this.storage.getData('addUser') as string);
    if (data != null || data != undefined) {
      this.route.navigate(['/view'])
    } else {
      this.route.navigate(['/home'])
    }
  }
}
