import { createRouter, createWebHistory } from 'vue-router'

import home from './routes/home';
import registration from './routes/registartion'
import login from './routes/login'
import dashboard from "@/router/routes/dashboard";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      ...home,
      ...registration,
      ...login,
      ...dashboard,

  ]
});

export default router
