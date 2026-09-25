import { computed, Directive, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FILLED_ICONS, ICONS, IconName } from './icon-set';

@Directive({
  selector: 'svg[kbkIcon]',
  host: {
    viewBox: '0 0 24 24',
    'aria-hidden': 'true',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    '[attr.fill]': "filled() ? 'currentColor' : 'none'",
    '[attr.stroke]': "filled() ? null : 'currentColor'",
    '[attr.stroke-width]': 'filled() ? null : strokeWidth()',
    '[innerHTML]': 'markup()',
  },
})
export class Icon {
  readonly kbkIcon = input.required<IconName>();
  readonly strokeWidth = input(1.6);

  private readonly sanitizer = inject(DomSanitizer);

  protected readonly filled = computed(() => FILLED_ICONS.has(this.kbkIcon()));
  protected readonly markup = computed(() =>
    this.sanitizer.bypassSecurityTrustHtml(ICONS[this.kbkIcon()]),
  );
}
