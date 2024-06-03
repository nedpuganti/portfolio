import { Component, OnInit } from '@angular/core';
import TypeIt from 'typeit';

@Component({
  selector: 'pfo-home',
  template: `<!-- Main Content (Home) Starts -->
    <div class="main-content active" id="home">
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
          <div class="box-wrapper" id="about-menu">
            <div class="inner-box-wrapper">
              <a class="menu-link" href="#about">
                <div class="valign-center">
                  <i class="fas fa-id-card fa-3x"></i>
                  <h5>About <span>Me</span></h5>
                </div>
              </a>
            </div>
          </div>
          <!-- About Menu Ends -->
          <!-- Resume Menu Starts -->
          <div class="box-wrapper" id="resume-menu">
            <div class="inner-box-wrapper">
              <a class="menu-link" href="#resume">
                <div class="valign-center">
                  <i class="fas fa-newspaper fa-3x"></i>
                  <h5>My <span>Resume</span></h5>
                </div>
              </a>
            </div>
          </div>
          <!-- Resume Menu Ends -->
          <!-- Portfolio Menu Starts -->
          <div class="box-wrapper" id="portfolio-menu">
            <div class="inner-box-wrapper">
              <a class="menu-link" href="#portfolio">
                <div class="valign-center">
                  <i class="fas fa-toolbox fa-3x"></i>
                  <h5>My <span>Portfolio</span></h5>
                </div>
              </a>
            </div>
          </div>
          <!-- Portfolio Menu Ends -->
          <!-- Contact Menu Starts -->
          <div class="box-wrapper" id="contact-menu">
            <div class="inner-box-wrapper">
              <a class="menu-link" href="#contact">
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
  ngOnInit(): void {
    this.initTypeIt();
  }

  initTypeIt(): void {
    if (typeof TypeIt != 'undefined') {
      new TypeIt('.passion', {
        speed: 200,
        startDelay: 800,
        strings: ['Senior Frontend', 'Full Stack Developer'],
        breakLines: false,
        loop: true
      }).go();
    }
  }
}
