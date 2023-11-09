import { createRouter, createWebHistory } from 'vue-router';

import home from './routes/home';
import registration from './routes/registration';
import login from './routes/login';
import dashboard from './routes/dashboard';

const routes = [
    ...home,
    ...registration,
    ...login,
    ...dashboard,
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
