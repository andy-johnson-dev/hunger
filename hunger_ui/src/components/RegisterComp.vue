<template>
  <v-form>
    <v-card class="mx-auto" max-width="344" title="User Registration">
      <v-container>
        <v-text-field
          v-model="first"
          color="primary"
          label="First name"
          variant="underlined"
        ></v-text-field>

        <v-text-field
          v-model="last"
          color="primary"
          label="Last name"
          variant="underlined"
        ></v-text-field>

        <v-text-field
          v-model="username"
          color="primary"
          label="Username"
          variant="underlined"
        ></v-text-field>

        <v-text-field
          v-model="email"
          color="primary"
          label="Email"
          variant="underlined"
        ></v-text-field>

        <v-text-field
          v-model="password"
          color="primary"
          label="Password"
          placeholder="Enter your password"
          variant="underlined"
        ></v-text-field>

        <v-checkbox
          v-model="terms"
          color="secondary"
          label="I agree to site terms and conditions"
        ></v-checkbox>
      </v-container>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="success" :disabled="!terms" @click="handleRegister">
          Complete Registration

          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>
  <script>
// import * as yup from "yup";
// import { useAuthStore } from "@/stores/auth.store";
export default {
  props: ["showModal"],
  data: () => ({
    form: false,
    terms: false,
    first: null,
    last: null,
    email: null,
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
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/home");
    }
  },
  methods: {
    handleRegister() {
      this.loading = true;
      const user = {
        firstname: this.first,
        lastname: this.last,
        email: this.email,
        username: this.username,
        password: this.password,
      };
      this.$store
        .dispatch("auth/register", user)
        .then(
          () => {
            this.successful = true;
            this.loading = false;
            this.$emit("loginAfterRegister");
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
        )
        .then(() => {
          this.$router.push("/home");
        });
    },
    required(v) {
      return !!v || "Field is required";
    },
  },
};
</script>