<template>
  <main>
    <section class="section">
      <div class="container">
        <div class="controller">
          <div class="notification is-danger" id="feedback" v-if="feedback">
            <button class="delete" @click="feedback = null"></button>
            {{feedback}}
          </div>
          <div class="box">
            <form @submit.prevent="doLogin">
              <div class="field">
                <label class="label">Email</label>
                <div class="control">
                  <input
                    class="input"
                    type="email"
                    v-model="email"
                    placeholder="e.g. alexsmith@gmail.com"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label">Password</label>
                <div class="control">
                  <input class="input" type="password" v-model="password" />
                </div>
              </div>
              <div class="field is-grouped is-grouped-centered">
                <p class="control">
                  <button type="submit" class="button is-link">Sign In</button>
                </p>
                <p class="control">
                  <!-- <a to="/signup" class="button">Cancel</a> -->
                  <router-link to="/" class="button">Cancel</router-link>
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
import axios from "axios";

export default {
  name: "login",
  data() {
    return {
      showPass: false,
      email: null,
      password: null,
      feedback: null
    };
  },
  methods: {
    doLogin() {
      if (!this.email || !this.password) {
        this.feedback = `Please fill all the fields.`;
      } else {
        // get all params for API
        const user = {
          email: this.email,
          password: this.password
        };

        const url = `/api/users/login`;

        axios
          .post(url, JSON.stringify(user), {
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(res => {
            // console.log(res);
            return res.data;
          })
          .then(data => {
            // save data in localstorage
            // console.log(data);
            localStorage.clear();
            localStorage.setItem("jwt_token", data.jwt_token);
            // clean form
            this.clearForm();
            this.$store.dispatch("toggle");
            // redirect to profile
            this.$router.push("/profile");
          })
          .catch(err => {
            // console.log(err);
            if (err.response.status === 500) {
              this.feedback = `ERROR : Internal Server Error`;
              this.clearForm();
              return;
            }
            this.feedback = `ERROR : ${err.response.data}`;
          });
      }
    },
    clearForm() {
      this.email = null;
      this.password = null;
      this.feedback = null;
    }
  }
};
</script>