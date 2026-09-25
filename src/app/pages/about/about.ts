import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CtaSection } from '../../shared/cta-section/cta-section';
import { Icon } from '../../shared/icon';
import { IconName } from '../../shared/icon-set';
import { Reveal } from '../../shared/reveal';
import { Tone } from '../../shared/site';

interface JourneyStep {
  year: string;
  until?: string;
  title: string;
  place: string;
  text: string;
  tone: Tone;
}

interface Publication {
  journal: string;
  year: string;
  tone: Tone;
}

interface Card {
  title: string;
  text: string;
  icon: IconName;
  tone: Tone;
}

interface WorkMode extends Card {
  subtitle: string;
  tags: string[];
  note?: string;
  image: string;
}

interface ToolGroup {
  title: string;
  tools: string[];
}

@Component({
  selector: 'kbk-about',
  imports: [CtaSection, Icon, Reveal],
  templateUrl: './about.html',
  styleUrl: './about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  protected readonly journey: JourneyStep[] = [
    {
      year: '2016',
      until: '2018',
      title: 'Livestock genomics',
      place: 'INRAE',
      text:
        'Pipelines that detect genetic variants from raw sequencing data, and training sessions ' +
        'for colleagues.',
      tone: 'sage',
    },
    {
      year: '2018',
      until: '2020',
      title: 'Oncology research',
      place: 'Institut Gustave Roussy',
      text:
        'Analysis pipelines and a web platform to explore tumor genomic data across research ' +
        'units.',
      tone: 'plum',
    },
    {
      year: '2021',
      until: '2022',
      title: 'Synthetic biology',
      place: 'INRAE',
      text: 'Conda packaging, Galaxy workflows, CI/CD, and user tutorials still used today.',
      tone: 'sky',
    },
    {
      year: '2023',
      until: '2024',
      title: 'Full-stack certification',
      place: 'OpenClassrooms',
      text: 'One year to master Django, secure APIs, testing at every level and deployment.',
      tone: 'sand',
    },
    {
      year: '2025',
      title: 'Generative AI tooling',
      place: 'Capgemini',
      text: 'A Flask REST API deployed on Azure, with contributions to the Angular front-end.',
      tone: 'peach',
    },
    {
      year: '2025',
      until: '2026',
      title: 'Full-stack data platform',
      place: 'Limagrain',
      text:
        'Main developer of a platform built end to end: Angular, Django REST, PostgreSQL, ' +
        'Docker, CI/CD.',
      tone: 'teal',
    },
    {
      year: '2026',
      title: 'Intensive front-end training',
      place: 'Mayerfeld Consulting',
      text: 'One month of intensive training to sharpen my front-end skills.',
      tone: 'sand',
    },
    {
      year: 'Now',
      title: 'Freelance',
      place: 'KBK Digital Solutions',
      text: 'Today, I help companies, associations and teams build tools that last.',
      tone: 'teal',
    },
  ];

  protected readonly publications: Publication[] = [
    { journal: 'Frontiers in Genetics', year: '2021', tone: 'sage' },
    { journal: 'ACS Synthetic Biology', year: '2022', tone: 'sky' },
    { journal: 'Nature Communications', year: '2022', tone: 'plum' },
  ];

  protected readonly orcidUrl = 'https://orcid.org/0000-0002-4319-5616';
  protected readonly trainingUrl =
    'https://training.galaxyproject.org/training-material/hall-of-fame/kenza12/';

  protected readonly principles: Card[] = [
    {
      title: 'I listen first',
      text:
        'Before writing any code, I make sure I understand your need, and I say it back to you ' +
        'in simple words.',
      icon: 'message',
      tone: 'teal',
    },
    {
      title: 'Built to last',
      text:
        'Tests, documentation and clean code by default, so your tool keeps working long after ' +
        'delivery.',
      icon: 'stack',
      tone: 'sky',
    },
    {
      title: 'Clear at every step',
      text:
        'Regular demos and plain explanations. You always know where your project is, without ' +
        'jargon.',
      icon: 'eye',
      tone: 'peach',
    },
    {
      title: 'Honest advice',
      text:
        'If a simpler solution exists, or if I am not the right person for your project, I tell ' +
        'you.',
      icon: 'check-circle',
      tone: 'plum',
    },
  ];

  protected readonly workModes: WorkMode[] = [
    {
      title: 'On my own',
      subtitle: 'For projects, end to end',
      text:
        'From the first conversation to deployment, I handle the whole project and keep you ' +
        'updated at every step.',
      tags: ['Scoping', 'Development', 'Deployment', 'Maintenance'],
      image: 'images/about/work-solo.webp',
      icon: 'user',
      tone: 'teal',
    },
    {
      title: 'Inside your team',
      subtitle: 'As an extra developer in your agile team',
      text:
        'I join your developers remotely and follow your rituals, tools and coding standards ' +
        'from day one.',
      tags: ['Scrum & Kanban', 'Sprints & stand-ups', 'Code reviews', 'Git workflows'],
      note: 'Also available through consulting firms and agencies.',
      image: 'images/about/work-team.webp',
      icon: 'team',
      tone: 'sky',
    },
  ];

  protected readonly toolbox: ToolGroup[] = [
    { title: 'Front-end', tools: ['Angular', 'TypeScript', 'JavaScript', 'HTML & SCSS'] },
    { title: 'Back-end', tools: ['Python', 'Django REST', 'Flask', 'REST APIs'] },
    { title: 'Data', tools: ['PostgreSQL', 'MySQL', 'SQLAlchemy'] },
    { title: 'DevOps & cloud', tools: ['Docker', 'Git', 'GitHub Actions', 'Azure DevOps', 'AWS'] },
    { title: 'Science & workflows', tools: ['Snakemake', 'Galaxy', 'Conda', 'Linux & HPC'] },
  ];

  protected readonly interests: Card[] = [
    {
      title: 'Gardening',
      text: 'Patience, observation, and things that grow step by step. A lot like software.',
      icon: 'sprout',
      tone: 'sage',
    },
    {
      title: 'Table tennis',
      text: 'Quick reflexes and a good dose of strategy.',
      icon: 'ping-pong',
      tone: 'peach',
    },
    {
      title: 'Gaming',
      text: 'I’m not competitive. Until the game starts.',
      icon: 'gamepad',
      tone: 'plum',
    },
    {
      title: 'Cooking',
      text: 'I cook by instinct, and I am turning my recipes into a book: À l’instinct.',
      icon: 'chef-hat',
      tone: 'sky',
    },
  ];
}
