<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <SideNav></SideNav>
    </v-navigation-drawer>

    <v-app-bar absolute density="compact">
      <v-app-bar-nav-icon
        class="text-secondary"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-avatar size="48"
        ><v-img src="@/assets/images/fork_logo.png"></v-img
      ></v-avatar>
      <v-toolbar-title class="text-secondary">Hunger</v-toolbar-title>
      <v-tabs class="text-secondary" centered>
        <v-tab :to="link.uri" v-for="link in links" :key="link">
          {{ link.name }}
        </v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import SideNav from "@/components/SideNav.vue";
export default {
  name: "App",
  data: () => ({
    drawer: null,
    links: [
      {
        name: "Home",
        uri: "/home",
      },
      {
        name: "Recipes",
        uri: "/recipes",
      },
      {
        name: "Shopping Lists",
        uri: "/shopping_lists",
      },
      {
        name: "Meal Plans",
        uri: "/meal_plans",
      },
    ],
  }),
  components: { SideNav },
};
</script>

<style scoped>
.left-justify {
  display: flex;
  justify-items: left;
}

.logo-img {
  height: 50px;
  width: 50px;
  align-content: flex-start;
}
</style>
