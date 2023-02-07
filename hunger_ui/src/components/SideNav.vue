<template>
  <v-container fluid>
    <v-list>
      <!-- <v-list-item
        ><v-avatar class="mb-4" color="grey-darken-1" size="42"></v-avatar
      ></v-list-item> -->
      <v-list-item
        nav
        prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
        :title="name"
        :subtitle="email"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        to="/meal_plans"
        class="text-secondary"
        prepend-icon="mdi-folder"
        title="Meal Plans"
        value="myfiles"
      ></v-list-item>
      <v-list-item
        to="/shopping_lists"
        class="text-secondary"
        prepend-icon="mdi-account-multiple"
        title="Shopping Lists"
        value="shared"
      ></v-list-item>
      <v-list-item
        to="/recipes"
        class="text-secondary"
        prepend-icon="mdi-star"
        title="Saved"
        value="starred"
      ></v-list-item>
      <v-list-item
        to="/test"
        class="text-secondary"
        prepend-icon="mdi-star"
        title="TEST"
        value="starred"
      ></v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-btn class="mt-2" @click="logout">log out</v-btn>
    <!-- <v-footer class="d-flex flex-row-reverse">
      <v-btn
        @click="logout"
        color="secondary"
        size="x-small"
        icon="mdi-power"
      ></v-btn
    ></v-footer> -->
  </v-container>
</template>

<script>
export default {
  data: () => ({
    name: "",
    email: "",
    photo: null,
  }),
  computed: {
    currentUser: {
      get() {
        return {
          name: `${this.$store.state.auth.user.firstname} ${this.$store.state.auth.user.lastname}`,
          email: `${this.$store.state.auth.user.email}`,
          photo: `${this.$store.state.auth.user.photo}`,
        };
      },
      set(newUser) {
        this.name = newUser.name;
        this.email = newUser.name;
        this.photo = newUser.photo;
      },
    },
  },
  mounted() {
    this.name = this.currentUser.name;
    this.email = this.currentUser.email;
    this.photo = this.currentUser.photo;
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.replace("/login");
    },
  },
};
</script>

<style>
</style>