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
            <form @submit.prevent="signUp">
              <div class="field">
                <label class="label">Name</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    id="name"
                    v-model="name"
                    placeholder="e.g Alex Smith"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label">Email</label>
                <div class="control">
                  <input
                    class="input"
                    type="email"
                    id="email"
                    v-model="email"
                    placeholder="e.g. alexsmith@gmail.com"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label">Password</label>
                <div class="control">
                  <input class="input" id="password" v-model="password" type="password" />
                </div>
              </div>
              <div class="field is-grouped is-grouped-centered">
                <p class="control">
                  <button class="button is-link" type="submit" id="sign-up">Sign Up</button>
                </p>
                <p class="control">
                  <button type="button" @click="clearForm" class="button">Clear</button>
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
  name: "signup",
  data() {
    return {
      showPass: false,
      name: null,
      email: null,
      password: null,
      feedback: null
    };
  },
  methods: {
    signUp() {
      if (!this.email || !this.name || !this.password) {
        this.feedback = `Please fill all the fields.`;
      } else {
        // get all params for API
        const user = {
          name: this.name,
          email: this.email,
          password: this.password
        };

        const url = `/api/users`;

        axios
          .post(url, JSON.stringify(user), {
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(res => res.data)
          .then(data => {
            // save data in localstorage
            // console.log(data);
            localStorage.clear();
            localStorage.setItem("jwt_token", data.jwt_token);
            // clean form
            this.clearForm();
            // redirect to profile
            this.$router.push("/profile");
          })
          .catch(err => {
            if(err.response.status === 500) {
              this.feedback = `ERROR : Internal Server Error`;
              return;
            }
            this.clearForm();
            this.feedback = `ERROR : ${err.response.data}`;
          });
      }
    },
    clearForm() {
      this.name = null;
      this.email = null;
      this.password = null;
      this.feedback = null;
    }
  }
};
</script>
