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

<style>
.option + .option {
  margin-top: var(--size-m);
}

.option-number {
  background-color: #823597;
  color: #ffffff;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-weight: bold;
  border-radius: var(--size-s);
  display: inline-block;
  margin-inline-end: var(--size-s);
}

.progress-bar-container {
  width: 100%;
  border: var(--size-xs) solid #823597;
  border-radius: var(--size-s);
  margin-top: var(--size-s);
}

.progress-bar {
  transition: width 600ms ease-in-out;
  width: 0;
  height: 30px;
  background-color: #823597;
}

.option.winning-option .progress-bar-container {
  border-color: #1ed581;
}

.option.winning-option .progress-bar-container .progress-bar {
  background-color: #1ed581;
}

.option.winning-option .option-number {
  background-color: #1ed581;
  color: #000000;
}

.option.draw-option .progress-bar-container {
  border-color: orange;
}

.option.draw-option .option-number {
  background-color: orange;
  color: #000000;
}

.option.draw-option .progress-bar-container .progress-bar {
  background-color: orange;
}
</style>
