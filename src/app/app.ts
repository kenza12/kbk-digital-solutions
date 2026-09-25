import { Component, inject } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Footer } from './layout/footer/footer';
import { Header } from './layout/header/header';
import { SocialRail } from './layout/social-rail/social-rail';
import { SCROLL_OFFSET } from './shared/site';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, SocialRail, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  constructor() {
    inject(ViewportScroller).setOffset(SCROLL_OFFSET);
  }
}
