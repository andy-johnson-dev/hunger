<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light center">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">
        <img src="../assets/images/fork_logo.png" width="50" height="50" />
        Hunger
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse center" id="navbarNavAltMarkup">
        <div class="navbar-nav center">
          <router-link class="nav-link" to="/recipes">Recipes</router-link>
          <router-link class="nav-link" to="/shopping_lists"
            >Shopping Lists</router-link
          >
          <router-link class="nav-link" to="/meal_plans"
            >Meal Plans</router-link
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style>
.navbar-nav.center {
  text-align: center;
}
.navbar-nav.center .navbar-inner .nav {
  display: inline-block;
  float: none;
}
</style>