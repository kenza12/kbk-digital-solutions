import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { DOCUMENT, ViewportScroller } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CtaSection } from '../../shared/cta-section/cta-section';
import { Icon } from '../../shared/icon';
import { IconName } from '../../shared/icon-set';
import { Reveal } from '../../shared/reveal';
import { SERVICES } from '../../shared/services.data';
import { SCROLL_OFFSET } from '../../shared/site';

interface SupportPlan {
  icon: IconName;
  title: string;
  description: string;
  details: string[];
}

interface StartingStep {
  title: string;
  description: string;
  duration: string;
  outcome: string;
}

const SCROLL_GAP = 16;

@Component({
  selector: 'kbk-services',
  imports: [CtaSection, Icon, Reveal, RouterLink],
  templateUrl: './services.html',
  styleUrl: './services.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Services {
  private readonly document = inject(DOCUMENT);
  private readonly route = inject(ActivatedRoute);
  private readonly viewportScroller = inject(ViewportScroller);

  private readonly nav = viewChild<ElementRef<HTMLElement>>('servicesNav');
  private readonly rows = viewChildren<ElementRef<HTMLElement>>('serviceRow');

  protected readonly services = SERVICES;
  protected readonly activeId = signal<string | null>(null);

  protected readonly supportPlans: SupportPlan[] = [
    {
      icon: 'wrench',
      title: 'On demand',
      description: 'You call when something breaks. Billed by the hour, no commitment.',
      details: ['Bug fixes', 'Small changes', 'Incident diagnosis'],
    },
    {
      icon: 'calendar',
      title: 'Monthly plan',
      description: 'A set number of hours reserved each month, so your application keeps moving.',
      details: [
        'Security updates',
        'Corrective fixes',
        'Small improvements',
        'Guaranteed response time',
      ],
    },
    {
      icon: 'cog',
      title: 'Tailored',
      description:
        'For a business-critical application that needs a guaranteed intervention window.',
      details: ['Agreed service levels', 'Priority handling', 'Scope defined together'],
    },
  ];

  protected readonly startingSteps: StartingStep[] = [
    {
      title: 'A first conversation',
      description:
        'We talk about what you need and what you already have. ' +
        'If I am not the right person for it, I will tell you.',
      duration: 'Free, no commitment',
      outcome: 'A clear view of the problem',
    },
    {
      title: 'A written proposal',
      description:
        'I come back with a defined scope, the deliverables, a timeline and a fixed price. ' +
        'Nothing starts before you agree.',
      duration: 'Within a few days',
      outcome: 'A quote you can compare',
    },
    {
      title: 'We start',
      description:
        'Short iterations with regular demos. ' +
        'You see the work as it progresses instead of waiting for a delivery date.',
      duration: 'From day one',
      outcome: 'Working software, step by step',
    },
  ];

  constructor() {
    const destroyRef = inject(DestroyRef);

    this.viewportScroller.setOffset(() => [0, this.stickyHeight() + SCROLL_GAP]);

    afterNextRender(() => {
      const scrollSpy = this.observeActiveService();
      destroyRef.onDestroy(() => scrollSpy.disconnect());
    });

    destroyRef.onDestroy(() => {
      this.viewportScroller.setOffset(SCROLL_OFFSET);
      this.document.documentElement.style.scrollBehavior = '';
    });
  }

  protected formatPosition(index: number): string {
    return (index + 1).toString().padStart(2, '0');
  }

  protected onAnchorClick(event: MouseEvent, id: string): void {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
      return;
    }

    if (!this.prefersReducedMotion()) {
      this.document.documentElement.style.scrollBehavior = 'smooth';
    }

    if (this.route.snapshot.fragment === id) {
      this.viewportScroller.scrollToAnchor(id);
    }
  }

  private observeActiveService(): IntersectionObserver {
    const visibleIds = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleIds.add(entry.target.id);
          } else {
            visibleIds.delete(entry.target.id);
          }
        }

        const active = this.services.find((service) => visibleIds.has(service.id));
        this.activeId.set(active?.id ?? null);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );

    for (const row of this.rows()) {
      observer.observe(row.nativeElement);
    }

    return observer;
  }

  private stickyHeight(): number {
    const root = this.document.documentElement;
    const headerHeight = parseFloat(getComputedStyle(root).getPropertyValue('--header-height'));

    const nav = this.nav()?.nativeElement;
    const navHeight = nav && getComputedStyle(nav).position === 'sticky' ? nav.offsetHeight : 0;

    return (headerHeight || 0) + navHeight;
  }

  private prefersReducedMotion(): boolean {
    return matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
}
