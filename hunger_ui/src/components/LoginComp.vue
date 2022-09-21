<template>
  <v-sheet class="bg-secondary pa-12" rounded>
    <v-card class="mx-auto px-6 py-8 bg-primary" max-width="344">
      <v-form v-model="form" @submit="onSubmit">
        <v-text-field
          v-model="email"
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

        <v-btn
          :disabled="!form"
          :loading="loading"
          block
          color="secondary"
          size="large"
          type="submit"
          variant="tonal"
        >
          Sign In
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<script>
export default {
  data: () => ({
    form: false,
    email: null,
    password: null,
    loading: false,
  }),

  methods: {
    onSubmit() {
      if (!this.form) return;
      this.loading = true;
      this.$router.replace({ path: "/" });
    },
    required(v) {
      return !!v || "Field is required";
    },
  },
};
</script>