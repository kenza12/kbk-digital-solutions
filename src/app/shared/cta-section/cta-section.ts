import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ActionButton } from '../action-button/action-button';
import { Icon } from '../icon';
import { IconName } from '../icon-set';

interface Highlight {
  icon: IconName;
  title: string;
  detail: string;
}

@Component({
  selector: 'kbk-cta-section',
  imports: [ActionButton, Icon],
  templateUrl: './cta-section.html',
  styleUrl: './cta-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.is-card]': "shape() === 'card'" },
})
export class CtaSection {
  readonly shape = input<'attached' | 'card'>('attached');

  protected readonly highlights: Highlight[] = [
    { icon: 'clock', title: 'Quick reply', detail: 'Within 24 hours on weekdays' },
    { icon: 'compass', title: 'Free first call', detail: 'No commitment, no sales pitch' },
    {
      icon: 'shield-check',
      title: 'Clear from the start',
      detail: 'Scope and timeline agreed upfront',
    },
  ];
}
