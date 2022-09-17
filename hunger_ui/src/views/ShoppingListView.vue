<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="2">
        <v-sheet rounded="lg" min-height="268">
          <SavedLists />
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="8">
        <v-sheet min-height="80vh" rounded="lg">
          <v-container>
            <TableComp />
          </v-container>
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="2">
        <v-sheet rounded="lg" min-height="268">
          <!--  -->
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TableComp from "@/components/TableComp.vue";
import SavedLists from "@/components/SavedLists.vue";
export default {
  data: () => ({}),
  components: { TableComp, SavedLists },
};
</script>


<style>
</style>