import { createRouter, createWebHistory } from 'vue-router';

import home from './routes/home';
import registration from './routes/registration'; // Parandage õigekirjavea 'registartion' -> 'registration'
import login from './routes/login';
import dashboard from './routes/dashboard'; // Võtke marsruutide import välja stringi abil

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...home,
        ...registration,
        ...login,
        ...dashboard,
    ],
});

export default router;
