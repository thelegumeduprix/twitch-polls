<template>
  <div
    class="option"
    :class="optionClasses"
    :id="'option-' + optionNumber"
    :key="optionNumber"
  >
    <div>
      <div class="option-number">{{ optionNumber }}</div>
      <span :contentEditable="true">{{ optionName }}</span
      >: <span class="percentage">{{ percentage }}% ({{ voteCount }})</span>
    </div>
    <div
      class="progress-bar-container"
      :id="'progress-bar-container-' + optionNumber"
    >
      <div
        class="progress-bar"
        :id="'progress-bar-' + optionNumber"
        :style="{ width: `${percentage}%` }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    optionNumber: String,
    optionName: String,
    voteCount: Number,
    totalCount: Number,
    winningOptions: Array
  },
  computed: {
    percentage() {
      return Math.round((this.voteCount / this.totalCount) * 100)
    },
    optionClasses() {
      if (this.winningOptions.includes(this.optionNumber)) {
        if (this.winningOptions.length === 1) {
          return 'option winning-option animate__animated animate__bounceIn'
        } else {
          return 'option draw-option animate__animated animate__shakeX'
        }
      }

      return ''
    }
  }
}
</script>
