import { Component, OnInit } from '@angular/core';
import TypeIt from 'typeit';

@Component({
  selector: 'app-home',
  template: `<!-- Main Content (Home) Starts -->
    <div id="home" class="main-content active">
      <!-- Content Hanging On Home Section Starts -->
      <div class="hanging">
        <div class="logo-hanging">
          <i class="fas fa-globe"></i>
        </div>
        <div class="text-hanging">
          <div class="word">
            <h6>HELLO <span>WORLD</span></h6>
          </div>
        </div>
      </div>
      <!-- Content Hanging On Home Section Ends -->
      <!-- Inner Content Starts -->
      <div class="inner-content">
        <!-- Head Content Starts -->
        <div class="head-content">
          <h3>I'M <span class="name">Naren Edpuganti</span></h3>
          <h5>As a <span class="passion"></span></h5>
        </div>
        <!-- Head Content Ends -->
        <!-- Content Starts -->
        <div class="content">
          <!-- About Menu Starts -->
          <div id="about-menu" class="box-wrapper">
            <div class="inner-box-wrapper">
              <a href="#about" class="menu-link">
                <div class="valign-center">
                  <i class="fas fa-id-card fa-3x"></i>
                  <h5>About <span>Me</span></h5>
                </div>
              </a>
            </div>
          </div>
          <!-- About Menu Ends -->
          <!-- Resume Menu Starts -->
          <div id="resume-menu" class="box-wrapper">
            <div class="inner-box-wrapper">
              <a href="#resume" class="menu-link">
                <div class="valign-center">
                  <i class="fas fa-newspaper fa-3x"></i>
                  <h5>My <span>Resume</span></h5>
                </div>
              </a>
            </div>
          </div>
          <!-- Resume Menu Ends -->
          <!-- Portfolio Menu Starts -->
          <div id="portfolio-menu" class="box-wrapper">
            <div class="inner-box-wrapper">
              <a href="#portfolio" class="menu-link">
                <div class="valign-center">
                  <i class="fas fa-toolbox fa-3x"></i>
                  <h5>My <span>Portfolio</span></h5>
                </div>
              </a>
            </div>
          </div>
          <!-- Portfolio Menu Ends -->
          <!-- Contact Menu Starts -->
          <div id="contact-menu" class="box-wrapper">
            <div class="inner-box-wrapper">
              <a href="#contact" class="menu-link">
                <div class="valign-center">
                  <i class="fas fa-envelope fa-3x"></i>
                  <h5>Contact <span>Me</span></h5>
                </div>
              </a>
            </div>
          </div>
          <!-- Contact Menu Ends -->
        </div>
        <!-- Content Ends -->
      </div>
      <!-- Inner Content Ends -->
    </div>
    <!-- Main Content (Home) Ends --> `,
  styles: [],
  standalone: true
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
