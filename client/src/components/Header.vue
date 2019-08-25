<template>
  <header>
    <nav class="navbar is-light" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <router-link class="navbar-item" to="/">
            <img
              src="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo4.png"
              width="132"
              height="38"
              alt="BRAND LOGO"
            />
          </router-link>

          <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <router-link class="button is-link" to="/">
                <strong>Get Started</strong>
              </router-link>
              <router-link class="button is-light" to="/login">Sign In</router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name : 'appHeader'
};
</script>

<style>
</style>