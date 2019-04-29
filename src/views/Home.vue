<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import Home from '@/components/Home.vue'; // @ is an alias to /src

@Component({
  components: {
    // Home,
  },
})
export default class Home extends Vue {}
</script>
