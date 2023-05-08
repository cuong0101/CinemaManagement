import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [
    {
        routeLink: 'user',
        icon: 'fa-regular fa-users',
        label: 'Users'
    },
    {
        routeLink: 'seatrank',
        icon: 'fa-thin fa-loveseat',
        label: 'Seat Rank',
    },
    {
        routeLink: 'Rank Point',
        icon: 'fa-solid fa-ranking-star',
        label: 'Statistics'
    },
    {
        routeLink: 'coupens',
        icon: 'fal fa-tags',
        label: 'Coupens',
        items: [
            {
                routeLink: 'coupens/list',
                label: 'List Coupens'
            },
            {
                routeLink: 'coupens/create',
                label: 'Create Coupens'
            }
        ]
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