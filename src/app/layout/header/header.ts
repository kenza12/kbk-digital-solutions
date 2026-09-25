import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ActionButton } from '../../shared/action-button/action-button';
import { NAV_LINKS } from '../../shared/site';

@Component({
  selector: 'kbk-header',
  imports: [RouterLink, RouterLinkActive, ActionButton],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onScroll()',
    '(document:keydown.escape)': 'closeMenu()',
  },
})
export class Header {
  protected readonly links = NAV_LINKS;
  protected readonly languages = ['FR', 'EN'];
  protected readonly activeLanguage = signal('EN');
  protected readonly isScrolled = signal(false);
  protected readonly isMenuOpen = signal(false);

  protected onScroll(): void {
    this.isScrolled.set(window.scrollY > 8);
  }

  protected closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}
