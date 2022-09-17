import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView'
import MealPlanView from '@/views/MealPlanView.vue'
import RecipeView from '@/views/RecipeView.vue'
import ShoppingListView from '@/views/ShoppingListView.vue'
// import { useAuthStore } from '../stores/users.store';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: '/shopping_lists',
        name: 'shopping_lists',
        component: ShoppingListView
      },
      {
        path: '/recipes',
        name: 'recipes',
        component: RecipeView
      },
      {
        path: '/meal_plans',
        name: 'meal_plans',
        component: MealPlanView
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  }


]

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  routes
})

// router.beforeEach(async (to) => {
//   const publicPages = ['/login'];
//   const authRequired = !publicPages.includes(to.path);
//   const auth = useAuthStore();

//   if (authRequired && !auth.user) {
//     auth.returnUrl = to.fullPath;
//     return '/login';
//   }
// })


export default router
