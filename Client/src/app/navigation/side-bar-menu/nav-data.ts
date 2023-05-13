import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [
    {
        routeLink: 'user',
        icon: 'fa-regular fa-users',
        label: 'Users'
    },
    {
        routeLink: 'seatrank',
        icon: 'fa-solid fa-chair',
        label: 'Seat Rank',
    },
    {
        routeLink: 'rankpoints',
        icon: 'fa-solid fa-ranking-star',
        label: 'Rank Point'
    },
    {
        routeLink: 'customer',
        icon: 'fa-solid fa-file-invoice',
        label: 'Customer',
    },
    {
        routeLink: 'room',
        icon: 'fa-regular fa-house-chimney-window',
        label: 'Room Cinema'
    },
    {
        routeLink: 'media',
        icon: 'fal fa-camera',
        label: 'Media'
    },
    {
      routeLink: 'promo',
      icon: 'fa-solid fa-tags',
      label: 'Discount',
      expanded: true,
      items: [
          {
              routeLink: 'promo/promotion',
              label: 'Promotion'
          },
          {
              routeLink: 'settings/voucher',
              label: 'Voucher'
          }
      ]
    },
    {
        routeLink: 'settings',
        icon: 'fal fa-cog',
        label: 'Settings',
        expanded: true,
        items: [
            {
                routeLink: 'settings/profile',
                label: 'Profile'
            },
            {
                routeLink: 'settings/customize',
                label: 'Customize'
            }
        ]
    },
];
