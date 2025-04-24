import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: "MENUITEMS.MENU.TEXT",
    isTitle: true,
  },
  {
    id: 2,
    label: "MENUITEMS.DASHBOARDS.TEXT",
    icon: "bx-home-circle",
    badge: {
      variant: "info",
      text: "MENUITEMS.DASHBOARDS.BADGE",
    },
    link: "/dashboard",
    subItems: [
      // {
      //     id: 3,
      //     label: 'MENUITEMS.DASHBOARDS.LIST.DEFAULT',
      //     link: '/dashboard',
      //     parentId: 2
      // },
      // {
      //     id: 4,
      //     label: 'MENUITEMS.DASHBOARDS.LIST.SAAS',
      //     link: '/dashboards/saas',
      //     parentId: 2
      // },
      // {
      //     id: 5,
      //     label: 'MENUITEMS.DASHBOARDS.LIST.CRYPTO',
      //     link: '/dashboards/crypto',
      //     parentId: 2
      // },
      // {
      //     id: 6,
      //     label: 'MENUITEMS.DASHBOARDS.LIST.BLOG',
      //     link: '/dashboards/blog',
      //     parentId: 2
      // },
    ],
  },
  {
    id: 7,
    isLayout: true,
  },
  {
    id: 8,
    label: "MENUITEMS.APPS.TEXT",
    isTitle: true,
  },
 
  {
    id: 12,
    label: "Incidents",
    icon: "bx-store",
    subItems: [
     
      {
        id: 18,
        label: "Demande d'incident",
        link: "/report/add/incident",
        parentId: 12,
      },
      {
        id: 19,
        label: "Mes incidents",
        link: "/report/list/incident",
        parentId: 12,
      },
      
    
    ],
  },
  {
    id: 12,
    label: "Ressources humaines",
    icon: "bx-store",
    subItems: [
     
      {
        id: 18,
        label: "Demande de congé",
        link: "/report/add/humanresources",
        parentId: 12,
      },
      {
        id: 19,
        label: "Mes Demandes",
        link: "/report/list/humanresources",
        parentId: 12,
      },
      
    
    ],
  },
  {
    id: 12,
    label: "Finance",
    icon: "bx-store",
    subItems: [
     
      {
        id: 18,
        label: "Demande financière",
        link: "/report/add/ficheDePaie",
        parentId: 12,
      },
      {
        id: 19,
        label: "Demande de fiche de paie",
        link: "/report/list/ficheDePaie",
        parentId: 12,
      },
      
    
    ],
  },
 
];
