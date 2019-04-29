<template>
  <div class="Nav" >
    <div class="nav" >
      <span class="white--text nav_text">myLogo</span>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Nav extends Vue {}
</script>

<style scoped>
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
