import Vue from 'vue';
import Router from 'vue-router';
// import Hello from '@/components/Hello';
import goods from '../components/goods/goods';
import ratings from '../components/ratings/ratings';
import seller from '../components/seller/seller';

Vue.use(Router);

export default new Router({
    linkActiveClass: 'active',
    routes: [
        {
            path: '/goods',
            name: 'goods',
            component: goods
        },
        {
            path: '/ratings',
            name: 'ratings',
            component: ratings
        },
        {
            path: '/seller',
            name: 'seller',
            component: seller
        }
    ]
});

// router.go('');

