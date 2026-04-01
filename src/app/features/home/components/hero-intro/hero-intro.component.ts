import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-hero-intro',
  templateUrl: './hero-intro.component.html',
  styleUrl: './hero-intro.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroIntroComponent {}
