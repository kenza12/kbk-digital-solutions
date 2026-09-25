import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Icon } from '../../shared/icon';
import { SERVICES } from '../../shared/services.data';
import { EMAIL, Tone } from '../../shared/site';

const FORM_ENDPOINT = 'https://api.web3forms.com/submit';
const FORM_ACCESS_KEY = '365a475e-2e6f-41ec-9771-8a19a5bf9361';

interface Choice {
  id: string;
  label: string;
  tone?: Tone;
}

interface Faq {
  question: string;
  answer: string;
}

@Component({
  selector: 'kbk-contact',
  imports: [Icon, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact implements OnInit {
  readonly service = input<string>();

  protected readonly email = EMAIL;

  protected readonly serviceOptions: Choice[] = [
    ...SERVICES.map(({ id, title, tone }) => ({ id, label: title, tone })),
    { id: 'maintenance', label: 'Maintenance & support', tone: 'sage' },
    { id: 'other', label: 'Something else', tone: 'sand' },
  ];

  protected readonly stageOptions: Choice[] = [
    { id: 'idea', label: 'Just an idea for now' },
    { id: 'existing', label: 'Something exists and needs to evolve' },
    { id: 'broken', label: 'Something is broken or too slow' },
  ];

  protected readonly startOptions: Choice[] = [
    { id: 'asap', label: 'As soon as possible' },
    { id: 'soon', label: 'In the next 1–3 months' },
    { id: 'exploring', label: 'Just exploring' },
  ];

  protected readonly nextSteps = [
    { title: 'I read your message', text: 'And I reply within 24 hours on weekdays.' },
    {
      title: 'We talk about your project',
      text: 'A free call to understand your context, your constraints and your goals.',
    },
    {
      title: 'You get a written proposal',
      text: 'Scope, timeline and a fixed price. No commitment.',
    },
  ];

  protected readonly faqs: Faq[] = [
    {
      question: 'Do you only work on scientific projects?',
      answer:
        'No. My background is in bioinformatics, but I build web applications, APIs and tools ' +
        'for any field: companies, associations, shops, research teams.',
    },
    {
      question: 'Can you work on an existing application?',
      answer:
        'Yes. I start with a short audit to understand the code, then fix and improve it step by ' +
        'step, without rewriting everything.',
    },
    {
      question: 'How do you price a project?',
      answer:
        'Most projects get a fixed price after our first call, based on a written scope. Small ' +
        'fixes and maintenance can be billed by the hour.',
    },
    {
      question: 'Can you sign an NDA?',
      answer: 'Yes. Your project stays confidential, before, during and after our collaboration.',
    },
    {
      question: 'Where are you based?',
      answer:
        'In France, working remotely with clients wherever they are. I work in English and in ' +
        'French.',
    },
  ];

  protected readonly form = inject(NonNullableFormBuilder).group({
    service: [''],
    stage: [''],
    start: [''],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    company: [''],
    message: ['', [Validators.required, Validators.minLength(20)]],
    website: [''],
  });

  protected readonly status = signal<'idle' | 'sending' | 'sent' | 'error'>('idle');
  protected readonly submitted = signal(false);
  protected readonly copied = signal(false);
  protected readonly sentName = signal('');

  ngOnInit(): void {
    const preselected = this.service();
    if (preselected && this.serviceOptions.some((option) => option.id === preselected)) {
      this.form.controls.service.setValue(preselected);
    }
  }

  protected showError(name: 'name' | 'email' | 'message'): boolean {
    const control = this.form.controls[name];
    return control.invalid && (control.touched || this.submitted());
  }

  protected async submit(): Promise<void> {
    this.submitted.set(true);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { website, ...fields } = this.form.getRawValue();
    this.sentName.set(fields.name.split(' ')[0]);

    if (website) {
      this.status.set('sent');
      return;
    }

    const service = this.labelOf(this.serviceOptions, fields.service);
    this.status.set('sending');

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: FORM_ACCESS_KEY,
          subject: `New project request: ${service || 'not specified'}`,
          from_name: fields.name,
          name: fields.name,
          email: fields.email,
          company: fields.company,
          service,
          stage: this.labelOf(this.stageOptions, fields.stage),
          start: this.labelOf(this.startOptions, fields.start),
          message: fields.message,
        }),
      });

      this.status.set(response.ok ? 'sent' : 'error');
    } catch {
      this.status.set('error');
    }
  }

  protected startOver(): void {
    this.form.reset();
    this.submitted.set(false);
    this.status.set('idle');
  }

  protected async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      return;
    }

    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }

  private labelOf(choices: Choice[], id: string): string {
    return choices.find((choice) => choice.id === id)?.label ?? '';
  }
}
