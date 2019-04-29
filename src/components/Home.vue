<template>
  <div>
    <Nav/>
    <v-container>
      我是主页
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    Nav: () => import('./publicComponents/Nav.vue'),
  },
})

export default class Home extends Vue {}
</script>


<style>
.nav {
  background: #3FA2FD;
}
.nav_text {
  display: inline-block;
  line-height: 48px;
  height: 48px;
  padding-left: 19px;
}
</style>
