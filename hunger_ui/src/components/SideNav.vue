<template>
  <v-container fluid>
    <v-list>
      <v-list-item title="Sandra" subtitle="sandra_a88@gmailcom"></v-list-item>
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
    </v-list>
    <v-divider></v-divider>
    <v-btn @click="logout">log out</v-btn>
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
  methods: {
    logout() {
      this.$router.replace("/login");
    },
  },
};
</script>

<style>
</style>