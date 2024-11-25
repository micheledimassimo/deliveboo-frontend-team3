import { reactive } from 'vue';

export const store = reactive({
    articlesInfo: [
        {
            title: 'Train with free weights or your body weight?',
            photo: '/images/blog1-400x208.jpg'
        },
        {
            title: 'Nutritional advice that will keep you training',
            photo: '/images/blog6-400x400.jpg'
        },
        {
            title: 'Simple principles for your next workout',
            photo: '/images/trainer4-400x297.jpg'
        },
        {
            title: 'To be number one, train like you\'re numer two',
            photo: '/images/blog4-400x289.jpg'
        },
        {
            title: 'The myths of shedding body fat exposed',
            photo: '/images/trainer1-400x297.jpg'
        },
        {
            title: 'Top 5 mistakes every gym member makes',
            photo: '/images/trainer3-400x297.jpg'
        },
    ],

    footerLinks: [

        {

            title: 'Scopri DeliveBoo',
            links: [
                {
                    nameLink: 'Investitori'
                },
                {
                    nameLink: 'Chi siamo'
                },
                {
                    nameLink: 'Ristoranti'
                },
                {
                    nameLink: 'Altro'
                },
            ]
        },


        {

            title: 'Note Legali',
            links: [
                {
                    nameLink: 'Termini & Condizioni'
                },
                {
                    nameLink: 'Indormativa sulla privacy'
                },
                {
                    nameLink: 'Cookies'
                },
                {
                    nameLink: 'Partner'
                },
            ]
        },

        {

            title: 'Aiuto',
            links: [
                {
                    nameLink: 'Contatti'
                },
                {
                    nameLink: 'FAQ'
                },
                {
                    nameLink: 'Tipi di cucina'
                }
            ]
        }


    ],


});