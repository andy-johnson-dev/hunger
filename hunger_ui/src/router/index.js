import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView'
import MealPlanView from '@/views/MealPlanView.vue'
import RecipeView from '@/views/RecipeView.vue'
import ShoppingListView from '@/views/ShoppingListView.vue'
import RegisterView from '@/views/RegisterView.vue'


const routes = [
  {
    path: '/home',
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
    component: LoginView,
    children: [
      {
        path: '/register',
        name: 'register',
        component: RegisterView
      },
    ]
  }


]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const isLoggedIn = localStorage.getItem('user')

  if (authRequired && !isLoggedIn) {
    next('/login')
  } else {
    next();
  }
})


export default router
