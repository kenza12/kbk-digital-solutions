import { Tone } from './site';

export interface Service {
  id: string;
  title: string;
  summary: string;
  needs: string[];
  work: string;
  deliverables: string[];
  technologies: string[];
  image: string;
  alt: string;
  tone: Tone;
}

export const SERVICES: Service[] = [
  {
    id: 'web-applications',
    title: 'Web applications',
    summary: 'Custom platforms built end to end, designed for the people who actually use them.',
    needs: [
      'You have a business process no off-the-shelf tool covers',
      'Your data is scattered across teams, files and formats',
      'You have a working prototype and want to turn it into a real product',
      'Your users lose time on an interface that does not match how they work',
    ],
    work:
      'Data management platforms, back-office tools, client portals, dashboards, ' +
      'submission and validation workflows. Interface and server side: I build both, ' +
      'from the first screen to production.',
    deliverables: [
      'A deployed application, front and back',
      'An interface designed around your real users',
      'Technical documentation',
      'A hands-on session with your team',
    ],
    technologies: ['Django REST', 'Angular', 'PostgreSQL', 'Docker'],
    image: 'images/services/01-web-applications.webp',
    alt: 'Laptop displaying a business dashboard surrounded by interface cards',
    tone: 'teal',
  },
  {
    id: 'apis-integrations',
    title: 'APIs & integrations',
    summary: 'Connect the tools you already have, and open your data to the systems that need it.',
    needs: [
      'Your tools do not talk to each other and data is re-entered by hand',
      'You want to open your data to partners or to another application',
      'You want to add AI features to an existing product',
      'You need to automate exchanges with a third-party service',
    ],
    work:
      'Documented REST APIs, connectors to your existing systems, third-party and generative ' +
      'AI integrations, along with the storage and cloud deployment that go with them.',
    deliverables: [
      'A production-ready API',
      'Endpoint documentation',
      'Automated tests covering every call',
      'Cloud deployment',
    ],
    technologies: ['Django REST', 'Flask', 'PostgreSQL', 'Azure'],
    image: 'images/services/02-apis-integrations.webp',
    alt: 'Databases, cloud and servers connected by data flows',
    tone: 'sky',
  },
  {
    id: 'code-quality',
    title: 'Code quality & deployment',
    summary: 'Make existing software reliable, testable and easy to ship.',
    needs: [
      'You inherited code nobody dares to touch',
      'Every release is a stressful moment',
      'Your application has become slow or unstable',
      'You have no tests, and each fix breaks something else',
    ],
    work:
      'An audit of the existing code, refactoring, automated testing at every level, ' +
      'a CI/CD pipeline that deploys without manual steps, Docker containerisation, ' +
      'and production incident diagnosis.',
    deliverables: [
      'An audit report with prioritised actions',
      'A meaningful test suite',
      'An automated deployment pipeline',
      'Up-to-date technical documentation',
    ],
    technologies: ['Pytest', 'GitHub Actions', 'Azure DevOps', 'Docker'],
    image: 'images/services/03-code-quality.webp',
    alt: 'Code editor, validated checklist and automated deployment pipeline',
    tone: 'peach',
  },
  {
    id: 'scientific-data',
    title: 'Scientific data & pipelines',
    summary: 'Turn scattered scientific data into structured, reproducible results.',
    needs: [
      'Your data is spread across units, in formats that do not match',
      'Your analyses give different results from one machine to another',
      'The same processing is re-run by hand for every new dataset',
      'Your tools can only be used by the person who wrote them',
    ],
    work:
      'Standardising and centralising your data in a structured database. ' +
      'Automated, reproducible analysis workflows. Packaging your tools so they install ' +
      'with a single command on any machine. Integrating them into a web platform, ' +
      'so your researchers can run them from a browser.',
    deliverables: [
      'A versioned, reproducible pipeline',
      'A packaged, portable environment',
      'Your tools published and installable',
      'Documentation written for end users, not developers',
    ],
    technologies: ['Snakemake', 'Galaxy', 'Conda', 'Python'],
    image: 'images/services/04-scientific-data.webp',
    alt: 'Monitor showing a heatmap and a scatter plot next to lab tubes and a database',
    tone: 'plum',
  },
];
