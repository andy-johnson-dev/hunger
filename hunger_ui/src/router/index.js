import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/shopping_lists',
    name: 'shopping_lists',
    component: () => import(/* webpackChunkName: "about" */ '../views/ShoppingListView.vue')
  },
  {
    path: '/recipes',
    name: 'recipes',
    component: () => import('../views/RecipeView.vue')
  },
  {
    path: '/meal_plans',
    name: 'meal_plans',
    component: () => import('../views/MealPlanView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
