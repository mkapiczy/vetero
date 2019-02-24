<template>
  <div class="ui grid" style="margin-top: 0.5em; margin-bottom: 0.5em;">
    <div class="ui blue buttons">
      <div
        class="ui button"
        @click="onModeChange('HOURLY')"
        :class="{ active: mode === 'HOURLY' }"
      >
        {{ $t("HOURLY") }}
      </div>
      <div
        class="ui button"
        @click="onModeChange('SUMMARY')"
        :class="{ active: mode === 'SUMMARY' }"
      >
        {{ $t("DAILY_SUMMARY") }}
      </div>
      <div
        class="ui button"
        @click="onModeChange('DETAILS')"
        :class="{ active: mode === 'DETAILS' }"
      >
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
    this.mode = mode;
    this.$emit("modeChange", mode);
  }
}
</script>
