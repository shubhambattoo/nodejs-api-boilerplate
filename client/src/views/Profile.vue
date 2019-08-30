<template>
  <main>
    <section class="section">
      <div class="container">
        <div class="box">
          <div class="subtitle">Congratulations! You are logged in!</div>

          <div class="data" v-if="!loading">
            <div class="row">
              <p>
                <strong>Name</strong>
              </p>

              <p>{{profileData.name}}</p>
            </div>

            <div class="row">
              <p>
                <strong>Email</strong>
              </p>

              <p>{{profileData.email}}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import axios from "axios";

export default {
  name: "profile",
  data () {
    return {
      profileData : null,
      loading : true
    }
  },
  methods : {
    getProfile () {
      const token = localStorage.getItem("jwt_token");
      if (token) {
        const url = `/api/users/me`;
        axios.get(url, {
          headers : {
            Authorization : `Bearer ${token}`
          }
        })
        .then((res) => res.data)
        .then((data) => {
          this.profileData = data;
          this.loading = false;
        })
        .catch(() => {
          alert("Could not find profile data")
        })
      }
    }
  },
  created () {
    this.getProfile()
  }
};
</script>

<style>
</style>