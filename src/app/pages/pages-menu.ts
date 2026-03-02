import { NbMenuItem } from '@nebular/theme';

export const MENU_ADMIN: NbMenuItem[] = [
  { title: 'Tableau de bord', icon: 'shopping-cart-outline', link: '/pages/dashboard-admin' },
  { title: 'Utilisateur', icon: 'person-outline', link: '/pages/utilisateur' },

  { title: 'Catégories', icon: 'grid-outline', link: '/pages/categorie-boutique' },
  { title: 'Boutiques', icon: 'shopping-bag-outline', link: '/pages/boutique' },
  { title: 'Contrats', icon: 'file-text-outline', link: '/pages/contrat' },
  { title: 'Loyers', icon: 'calendar-outline', link: '/pages/loyer' },
];

export const MENU_GERANT: NbMenuItem[] = [
  { title: 'Articles', icon: 'archive-outline', link: '/pages/article' },
  { title: 'Ventes', icon: 'shopping-cart-outline', link: '/pages/vente' },
  { title: 'Stock', icon: 'layers-outline', link: '/pages/stock' },
];


