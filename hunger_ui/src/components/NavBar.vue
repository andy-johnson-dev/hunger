<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <v-avatar size="64">
        <img src="../assets/images/fork_logo.png" alt="Test" />
      </v-avatar>

      <v-tabs centered class="ml-n9" color="grey darken-1">
        <v-tab v-for="link in links" :key="link">
          {{ link }}
        </v-tab>
      </v-tabs>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="12" sm="2">
            <v-sheet rounded="lg" min-height="268">
              <!--  -->
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="8">
            <v-sheet min-height="70vh" rounded="lg">
              <!--  -->
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="2">
            <v-sheet rounded="lg" min-height="268">
              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
  
  <script>
export default {
  data: () => ({
    links: ["Recipes", "Ingredients", "Meal Plans", "Shopping Lists"],
  }),
};
</script>