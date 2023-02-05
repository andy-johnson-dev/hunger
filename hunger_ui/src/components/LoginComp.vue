<template>
  <v-sheet class="bg-secondary pa-12" rounded>
    <v-card class="mx-auto px-6 py-8 bg-primary" max-width="500">
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-text-field
          v-model="username"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          clearable
          label="Email"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :readonly="loading"
          :rules="[required]"
          clearable
          label="Password"
          placeholder="Enter your password"
        ></v-text-field>

        <br />
        <div>
          <v-btn
            :disabled="!form"
            :loading="loading"
            block
            color="secondary"
            size="small"
            type="submit"
            variant="tonal"
          >
            Sign In
          </v-btn>
          <v-divider class="mt-2"></v-divider>
          <vue-final-modal
            v-model="showModal"
            classes="modal-container"
            content-class="modal-content"
            @loginAfterRegister="showModal = false"
          >
            <span class="modal__title"><RegisterComp /></span>
          </vue-final-modal>
          <v-btn
            block
            color="secondary"
            size="small"
            variant="tonal"
            @click="showModal = true"
            >Register</v-btn
          >
        </div>
      </v-form>
    </v-card>
  </v-sheet>
</template>


<style scoped>
::v-deep .modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<script>
import { VueFinalModal } from "vue-final-modal";
import RegisterComp from "./RegisterComp.vue";

export default {
  components: {
    VueFinalModal,
    RegisterComp,
  },

  data: () => ({
    showModal: false,
    form: false,
    username: null,
    password: null,
    loading: false,
    message: "",
  }),
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/home");
    }
  },
  methods: {
    onSubmit() {
      this.loading = true;
      const user = {
        username: this.username,
        password: this.password,
      };
      console.log("test");
      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/home");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
    required(v) {
      return !!v || "Field is required";
    },
  },
};
</script>