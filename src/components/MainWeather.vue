<template>
  <div
    id="mainWeather"
    class="ui top attached segment"
    :class="{ loading: isLoading }"
  >
    <div id="weatherCard" class="ui fluid card">
      <div class="content">
        <div class="header">
          <img src="../assets/logo.png" class="ui avatar right spaced image" />
          Abbreviated Header
        </div>
        <div class="description">
          <img src="../assets/logo.png" class="ui wireframe image" />
        </div>
      </div>
      <div class="ui two bottom attached buttons">
        <div class="ui button">
          Action 1
        </div>
        <div class="ui button">
          Action 2
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#mainWeather {
  flex: auto;
}
#weatherCard {
  height: 100%;
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class MainWeather extends Vue {
  @Prop() private isLoading!: boolean;
}
</script>
