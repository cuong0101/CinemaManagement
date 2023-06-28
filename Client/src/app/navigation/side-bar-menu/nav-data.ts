import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [
    {
        routeLink: 'user',
        icon: 'fa-regular fa-users',
        label: 'Users'
    },
    {
        routeLink: 'bookTickets',
        icon: 'fa-regular fa-ticket',
        label: 'Book Tickets'
    },
    {
        routeLink: 'mstmovie',
        icon: 'fa-solid fa-film',
        label: 'Movie',
    },
    {
        routeLink: 'mstshowtime',
        icon: 'fa-solid fa-calendar-days',
        label: 'Showtime',
    },
    {
        routeLink: 'showtime-customer',
        icon: 'fa-solid fa-tape',
        label: 'Showtime Customer',
    },
    {
        routeLink: 'mstfood',
        icon: 'fa-solid fa-burger',
        label: 'Food',
    },
    {
        routeLink: 'seatrank',
        icon: 'fa-solid fa-couch',
        label: 'Seat Rank',
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
        routeLink: 'rankpoints',
        icon: 'fa-solid fa-ranking-star',
        label: 'Rank Point'
    },
    {
        routeLink: 'report',
        icon: 'fa-solid fa-chart-line',
        label: 'Report'
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
              routeLink: 'policygift',
              label: 'Voucher - Đổi điểm'
          }
      ]
    },
    {
        routeLink: 'settings',
        icon: 'fa-solid fa-gear',
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
