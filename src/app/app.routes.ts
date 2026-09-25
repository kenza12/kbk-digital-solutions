import { Routes } from '@angular/router';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Home } from './pages/home/home';
import { Services } from './pages/services/services';

export const routes: Routes = [
  { path: '', component: Home, title: 'Home | KBK Digital Solutions' },
  { path: 'services', component: Services, title: 'Services | KBK Digital Solutions' },
  { path: 'about', component: About, title: 'About | KBK Digital Solutions' },
  { path: 'contact', component: Contact, title: 'Contact | KBK Digital Solutions' },
];
