<template>
  <n-card content-style="padding: 0;">
    <n-tabs
      type="card"
      size="large"
      :tabs-padding="20"
      pane-style="padding: 20px;"
    >
      <n-tab-pane name="Shopping Lists">
        <n-dynamic-input v-model:value="customValue" :on-create="onCreate">
          <template #create-button-icon></template>
          <template #create-button-default>Add a new item here.</template>
          <template #default="{ value }">
            <div style="display: flex; align-items: center; width: 100%">
              <n-checkbox
                v-model:checked="value.isCheck"
                style="margin-right: 12px"
              />
              <n-input-number
                placeholder="Qty."
                size="small"
                :show-button="false"
                v-model:value="value.num"
                style="margin-right: 10px; width: 30px"
              />
              <n-input
                round
                size="small"
                placeholder="Add Item Here"
                v-model:value="value.string"
                type="text"
              />
            </div>
          </template>
        </n-dynamic-input>
      </n-tab-pane>
      <n-tab-pane name="Shopping Lists 2">
        <div class="pane-holder">
          <div class="pane-window">
            <div class="pane-items">
              <n-checkbox style="margin-right: 1em" />
              <n-input
                class="num-input"
                type="text"
                size="small"
                round
                placeholder="Qty"
                style="margin-right: 1em"
              ></n-input>

              <n-input
                round
                size="medium"
                style="width: 200px"
                placeholder="Add List Item"
              ></n-input>
              <n-button round class="button">+</n-button>
            </div>
          </div>
        </div>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>
  
  <script>
import { defineComponent, ref } from "vue";

import {
  NDynamicInput,
  NCheckbox,
  NInput,
  NInputNumber,
  NCard,
  NTabPane,
  NTabs,
  NButton,
} from "naive-ui";

export default defineComponent({
  components: {
    NDynamicInput,
    NCheckbox,
    NInput,
    NInputNumber,
    NCard,
    NTabPane,
    NTabs,
    NButton,
  },
  setup() {
    return {
      disabled: ref(true),
      customValue: ref([]),
      onCreate() {
        return {
          isCheck: false,
          num: 1,
          string: "",
        };
      },
    };
  },
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

<style scoped>
.num-input {
  max-width: 3em;
}

.pane-window {
  display: flex;
  align-items: flex-start;
}

.button {
  margin-left: 20px;
}
</style>