import { afterNextRender, DestroyRef, Directive, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: '[kbkReveal]',
  host: { class: 'reveal' },
})
export class Reveal {
  readonly revealMargin = input('0px 0px -10% 0px');
  readonly revealThreshold = input(0);

  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            element.classList.add('is-revealed');
            observer.disconnect();
          }
        },
        { rootMargin: this.revealMargin(), threshold: this.revealThreshold() },
      );

      observer.observe(element);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
