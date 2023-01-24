import { Component, OnInit } from '@angular/core';
import TypeIt from 'typeit';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ngOnInit() {
    this.initTypeIt();
  }

  initTypeIt() {
    if (typeof TypeIt != 'undefined') {
      new TypeIt('.passion', {
        speed: 200,
        startDelay: 800,
        strings: ['Frontend', 'Full Stack Developer'],
        breakLines: false,
        loop: true
      }).go();
    } else {
      return false;
    }
  }
}
