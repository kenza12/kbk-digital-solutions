import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { ActionButton } from '../../shared/action-button/action-button';
import { CtaSection } from '../../shared/cta-section/cta-section';
import { Icon } from '../../shared/icon';
import { IconName } from '../../shared/icon-set';
import { Reveal } from '../../shared/reveal';
import { Tone } from '../../shared/site';

interface Stat {
  icon: IconName;
  tone: Tone;
  title: string;
  subtitle: string;
}

interface Offering {
  diagram: 'web-app' | 'api' | 'quality' | 'pipeline';
  title: string;
  description: string;
  tags: { label: string; tone: Tone }[];
}

interface Step {
  icon: IconName;
  tone: Tone;
  title: string;
  description: string;
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  organisation: string;
  source: 'letter' | 'linkedin';
  language: 'fr' | 'en';
}

@Component({
  selector: 'kbk-home',
  imports: [ActionButton, CtaSection, Icon, Reveal],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly stats: Stat[] = [
    { icon: 'laptop', tone: 'teal', title: '7+', subtitle: 'years of experience' },
    { icon: 'code', tone: 'sage', title: 'Full-stack', subtitle: 'Django · Angular · PostgreSQL' },
    { icon: 'layers', tone: 'sand', title: 'Adaptable', subtitle: 'science, AI & web' },
    { icon: 'users', tone: 'peach', title: 'From idea', subtitle: 'to production' },
    { icon: 'pin', tone: 'sky', title: 'Based in France', subtitle: 'working remotely' },
  ];

  protected readonly offerings: Offering[] = [
    {
      diagram: 'web-app',
      title: 'Web applications',
      description:
        'Custom platforms built end to end, designed for the people who actually use them.',
      tags: [
        { label: 'Django', tone: 'teal' },
        { label: 'Angular', tone: 'sky' },
        { label: 'PostgreSQL', tone: 'sand' },
      ],
    },
    {
      diagram: 'api',
      title: 'APIs & integrations',
      description:
        'REST APIs that connect your tools, structure your data ' +
        'and bring AI features into your products.',
      tags: [
        { label: 'REST', tone: 'teal' },
        { label: 'Flask', tone: 'teal' },
        { label: 'Azure', tone: 'peach' },
      ],
    },
    {
      diagram: 'quality',
      title: 'Code quality & deployment',
      description:
        'Audits, refactoring, automated tests and CI/CD ' +
        'to make existing software reliable and easy to ship.',
      tags: [
        { label: 'Audit', tone: 'peach' },
        { label: 'Tests', tone: 'peach' },
        { label: 'CI/CD', tone: 'peach' },
      ],
    },
    {
      diagram: 'pipeline',
      title: 'Scientific data & pipelines',
      description:
        'Reproducible analysis pipelines that turn raw scientific data into usable results.',
      tags: [
        { label: 'Snakemake', tone: 'sage' },
        { label: 'Galaxy', tone: 'sand' },
        { label: 'Python', tone: 'teal' },
      ],
    },
  ];

  protected readonly steps: Step[] = [
    {
      icon: 'conversation',
      tone: 'sky',
      title: 'Understand',
      description: 'Your goals, your users and your constraints, rephrased until we fully agree.',
    },
    {
      icon: 'blueprint',
      tone: 'sand',
      title: 'Design',
      description: 'A clear architecture, scope and timeline, before a single line of code.',
    },
    {
      icon: 'code',
      tone: 'sage',
      title: 'Build',
      description: 'Short iterations with automated tests and regular demos.',
    },
    {
      icon: 'launch',
      tone: 'teal',
      title: 'Deliver',
      description: 'A deployed, documented tool and support after launch.',
    },
  ];

  protected readonly organisations = ['Limagrain', 'Capgemini', 'INRAE', 'Institut Gustave Roussy'];

  protected readonly testimonials: Testimonial[] = [
    {
      quote:
        'Kenza a toujours su être très professionnelle et didactique pour capturer le besoin ' +
        'client. Elle a notamment mis en place un portail de soumission de données par une ' +
        'webapp très performante et ergonomique.',
      author: 'Thomas Dugé de Bernonville',
      role: 'Responsable bioinformatique',
      organisation: 'Limagrain',
      source: 'letter',
      language: 'fr',
    },
    {
      quote:
        "Kenza recherche, s'interroge sur la meilleure solution à mettre en place, teste, " +
        'adapte, et réussi, avec méthode et rigueur.',
      author: 'Laurence Breuil',
      role: 'Chef de projet transverse',
      organisation: 'Capgemini',
      source: 'linkedin',
      language: 'fr',
    },
    {
      quote:
        'Her contributions significantly improved data quality, reproducibility, and ' +
        'accessibility, creating a robust foundation for data-driven research across R&D teams.',
      author: 'Felipe Lira, PhD',
      role: 'Senior Bioinformatician',
      organisation: 'Limagrain',
      source: 'letter',
      language: 'en',
    },
    {
      quote:
        "Elle a démontré une capacité exceptionnelle à s'approprier des sujets et technologies " +
        "qu'elle ne connaissait pas à son arrivée. Son éthique de travail a par ailleurs été " +
        'irréprochable ; toujours ponctuelle et fiable.',
      author: 'Thomas Duigou',
      role: 'Ingénieur de recherche',
      organisation: 'INRAE',
      source: 'letter',
      language: 'fr',
    },
    {
      quote:
        'Elle sait donner de la visibilité, poser les bonnes questions au bon moment, ' +
        'et partager ses idées avec clarté.',
      author: 'Damien Ledez',
      role: 'Ingénieur logiciels, Scrum Master',
      organisation: 'Capgemini',
      source: 'linkedin',
      language: 'fr',
    },
  ];

  protected readonly activeIndex = signal(0);
  protected readonly activeTestimonial = computed(() => this.testimonials[this.activeIndex()]);

  protected formatPosition(index: number): string {
    return (index + 1).toString().padStart(2, '0');
  }

  protected replayDiagram(card: HTMLElement): void {
    card.classList.remove('is-playing');
    void card.offsetWidth;
    card.classList.add('is-playing');
  }

  protected showTestimonial(index: number): void {
    const count = this.testimonials.length;
    this.activeIndex.set((index + count) % count);
  }
}
