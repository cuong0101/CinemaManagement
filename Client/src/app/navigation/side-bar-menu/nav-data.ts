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
        routeLink: 'Rank Point',
        icon: 'fa-solid fa-ranking-star',
        label: 'Rank Point'
    },
    {
        routeLink: 'customer',
        icon: 'fa-solid fa-file-invoice',
        label: 'Customer',
    },
    {
        routeLink: 'pages',
        icon: 'fal fa-file',
        label: 'Pages'
    },
    {
        routeLink: 'media',
        icon: 'fal fa-camera',
        label: 'Media'
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