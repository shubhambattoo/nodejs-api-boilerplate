<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name : 'app',
  components : {
    Header,
    Footer
  },
  created () {
    this.$store.dispatch("init");
  }
}
</script>

<style>
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

body {
  box-sizing: border-box;
  font-family: "Lato", sans-serif;
  font-weight: 400;
	line-height: 1.7;
	color: #222;
}

::selection {
  background-color: lightgreen;
  color: #fff;
}

.controller {
	display: flex;
	justify-content: center;
  align-items: center;
  flex-flow: column;
}
</style>
