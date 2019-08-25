<template>
  <main>
    <section class="section">
      <div class="container">
        <div class="controller">
          <div class="notification is-danger" id="feedback" v-if="false">
            <button class="delete"></button>
            Please fill all the
            <strong>fields</strong>.
          </div>
          <div class="box">
            <form>
              <div class="field">
                <label class="label">Name</label>
                <div class="control">
                  <input class="input" type="text" id="name" placeholder="e.g Alex Smith" />
                </div>
              </div>
              <div class="field">
                <label class="label">Email</label>
                <div class="control">
                  <input
                    class="input"
                    type="email"
                    id="email"
                    placeholder="e.g. alexsmith@gmail.com"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label">Password</label>
                <div class="control has-icons-right">
                  <input class="input" id="password" type="password" />
                  <span class="icon is-small is-right">
                    <i class="fas fa-eye-slash"></i>
                  </span>
                </div>
              </div>
              <div class="field is-grouped is-grouped-centered">
                <p class="control">
                  <button class="button is-link" type="submit" id="sign-up">Sign Up</button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: "signup"
};
</script>
