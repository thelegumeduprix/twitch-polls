<template>
  <div
    class="option"
    :class="optionClasses"
    :key="optionNumber"
  >
    <div>
      <div class="option-number">{{ optionNumber }}</div>
      <span :contentEditable="true">{{ optionName }}</span
      >: <span class="percentage">{{ percentage }}% ({{ voteCount }})</span>
    </div>
    <div class="progress-bar-container">
      <div
        class="progress-bar"
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
    winningOptions: Array,
  },
  computed: {
    percentage() {
      return this.totalCount === 0 ? 0 : Math.round((this.voteCount / this.totalCount) * 100);
    },
    optionClasses() {
      if (this.winningOptions.includes(this.optionNumber)) {
        if (this.winningOptions.length === 1) {
          return 'winning-option animate__animated animate__bounceIn';
        } else {
          return 'draw-option animate__animated animate__shakeX';
        }
      }

      return '';
    },
  },
};
</script>
