<template>
  <div class="ui stackable grid">
    <div class="three wide column">
      <div class="ui button" @click="onModeChange('HOURLY')">
        {{ $t("HOURLY") }}
      </div>
    </div>
    <div class="three wide column">
      <div class="ui button" @click="onModeChange('SUMMARY')">
        {{ $t("DAILY_SUMMARY") }}
      </div>
    </div>
    <div class="three wide column">
      <div class="ui button" @click="onModeChange('DETAILS')">
        {{ $t("DETAILS") }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#forecast {
  flex: none;
  min-height: 35%;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ForecastModeMenu extends Vue {
  mode: string = "HOURLY";

  onModeChange(mode: string) {
    this.$emit("modeChange", mode);
  }
}
</script>
