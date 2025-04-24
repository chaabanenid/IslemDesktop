import { MenuItem } from './menu.model';

export const MENUADMIN: MenuItem[] = [
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
        id: 12,
        label: 'Administration',
        icon: 'bx-store',
        
        subItems: [
            {
                id: 16,
                label: 'Users',
                link: '/report/customers',
                parentId: 12
            },

            {
                id: 19,
                label: 'Complaint list',
                link: '/report/list',
                parentId: 12
            },

        ]
    },

];

