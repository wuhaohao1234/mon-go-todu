<template>
  <v-app>
    <v-content>
      <router-view>
      </router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({
  components: {
    Home : () => import(/* webpackChunkName: "about" */ './components/Home.vue'),
  },
})
export default class App extends Vue {}
</script>
