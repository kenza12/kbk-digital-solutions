import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icon';
import { EMAIL, GITHUB_URL, LINKEDIN_URL, NAV_LINKS, NavLink } from '../../shared/site';

@Component({
  selector: 'kbk-footer',
  imports: [RouterLink, Icon],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  protected readonly email = EMAIL;
  protected readonly linkedinUrl = LINKEDIN_URL;
  protected readonly githubUrl = GITHUB_URL;
  protected readonly links = NAV_LINKS;
  protected readonly year = new Date().getFullYear();

  protected readonly legalLinks: NavLink[] = [
    { label: 'Legal notice', route: '/legal-notice' },
    { label: 'Privacy policy', route: '/privacy' },
  ];
}
