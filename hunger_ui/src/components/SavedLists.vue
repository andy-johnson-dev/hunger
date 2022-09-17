<template>
  <v-container class="pa-0">
    <v-card class="text-secondary" append-icon="mdi-star">
      <template v-slot:title>Saved Lists</template>
      <v-divider></v-divider>
      <v-card-text>
        <v-list density="compact">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :value="item"
            active-color="secondary"
            density="compact"
            class="list-item"
          >
            <template v-slot:prepend>
              <v-icon color="secondary" :icon="item.icon"></v-icon>
            </template>

            <v-list-item-title
              class="list-item text-secondary"
              v-text="item.text"
            ></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn size="small" rounded="lg" variant="tonal">Load</v-btn>
        <v-spacer></v-spacer>
        <v-btn size="small" rounded="lg" variant="tonal">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    items: [
      { text: "Real-Time", icon: "mdi-clock" },
      { text: "Audience", icon: "mdi-account" },
      { text: "Conversions", icon: "mdi-flag" },
    ],
  }),
};
</script>

<style>
.list-item {
  font-size: small;
}
</style>