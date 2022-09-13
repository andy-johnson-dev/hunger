<template>
  <div class="container-lg">
    <div class="card" style="max-width: 30rem">
      <div class="card-body">
        <h2 class="card-title">Shopping List</h2>
      </div>
      <ul class="list-group">
        <li class="list-group-item" v-for="(item, i) in items" :key="i">
          <input
            class="form-check-input me-1"
            type="checkbox"
            :value="item.name"
            aria-label="..."
          />
          {{ item.name }}
        </li>
      </ul>
      <div class="card-footer input-group">
        <input
          @keypress.enter="eventSubmitted()"
          v-model="list_input"
          type="text"
          class="form-control"
          placeholder="Add Ingredient"
          aria-label=""
          aria-describedby="button-addon2"
        />
        <button
          @click="eventSubmitted()"
          class="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
        >
          +
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      items: [
        {
          name: "Apples",
          qty: 1,
        },
      ],
      list_input: "",
    };
  },
  methods: {
    eventSubmitted() {
      console.log("event Submitted");
      if (this.list_input.length > 0) {
        this.items.push({ name: this.list_input, qty: 1 });
      }
      this.list_input = "";
    },
  },
});
</script>

<style>
</style>