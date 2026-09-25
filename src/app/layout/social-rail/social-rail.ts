import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icon } from '../../shared/icon';
import { IconName } from '../../shared/icon-set';
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from '../../shared/site';

interface SocialLink {
  icon: IconName;
  label: string;
  url: string;
}

@Component({
  selector: 'kbk-social-rail',
  imports: [Icon],
  templateUrl: './social-rail.html',
  styleUrl: './social-rail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialRail {
  protected readonly keywords = [
    'Web applications',
    'APIs',
    'Dashboards',
    'Automation',
    'Data pipelines',
  ];

  protected readonly tickerCopies = [0, 1];

  protected readonly links: SocialLink[] = [
    { icon: 'linkedin', label: 'LinkedIn', url: LINKEDIN_URL },
    { icon: 'github', label: 'GitHub', url: GITHUB_URL },
    { icon: 'mail', label: 'Email', url: `mailto:${EMAIL}` },
  ];
}
