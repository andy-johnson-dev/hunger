<template>
  <div class="buffer">
    <n-grid cols="4" item-responsive responsive>
      <n-grid-item class="buffer-left"><ListComp /></n-grid-item>
      <n-grid-item class="buffer"
        ><n-card><RecipeCarousel /></n-card
      ></n-grid-item>
      <n-grid-item class="buffer"
        ><n-card embedded><RecipeCarousel /></n-card
      ></n-grid-item>
      <n-grid-item><ListComp /></n-grid-item>
    </n-grid>
  </div>
</template>

<script>
import RecipeCarousel from "@/components/RecipeCarousel.vue";
import ListComp from "@/components/ListComp.vue";
import { NGridItem, NGrid, NCard } from "naive-ui";

export default {
  components: {
    RecipeCarousel,
    ListComp,
    NGrid,
    NGridItem,
    NCard,
  },
};
</script>

<style>
.container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.item {
  align-self: flex-start;
}
.buffer {
  margin: 1em 2em 2em 0em;
}

.buffer-left {
  margin: 0em 2em 2em 2em;
}
</style>