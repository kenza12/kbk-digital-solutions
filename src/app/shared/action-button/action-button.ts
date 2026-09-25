import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../icon';

@Component({
  selector: 'kbk-action-button',
  imports: [NgTemplateOutlet, RouterLink, Icon],
  templateUrl: './action-button.html',
  styleUrl: './action-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionButton {
  readonly label = input.required<string>();
  readonly link = input.required<string>();
  readonly variant = input<'filled' | 'outline' | 'on-dark'>('filled');

  protected readonly isExternal = computed(() => !this.link().startsWith('/'));
}
