<template>
  <div
    class="option"
    :class="optionClasses"
    :key="optionNumber"
  >
    <div>
      <div
        class="option-number"
        ref="optionNumber"
      >
        {{ optionNumber }}
      </div>
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
import { colord, extend } from 'colord';
import a11yPlugin from 'colord/plugins/a11y';

extend([a11yPlugin]);

export default {
  props: {
    optionNumber: String,
    optionName: String,
    voteCount: Number,
    totalCount: Number,
    winningOptions: Array,
  },
  mounted() {
    this.setContrastingTextColor();
  },
  updated() {
    this.setContrastingTextColor();
  },
  methods: {
    setContrastingTextColor() {
      this.$nextTick(() => {
        console.log('TESERTJseroisjerosjerojseorjseojr');
        const element = this.$refs.optionNumber;
        const backgroundColor = getComputedStyle(element).backgroundColor;

        const toWhiteContrast = colord(backgroundColor).contrast('#ffffff');
        const toBlackContrast = colord(backgroundColor).contrast('#000000');

        if (toWhiteContrast > toBlackContrast) {
          element.style.color = '#ffffff';
        } else {
          element.style.color = '#000000';
        }
      });
    },
  },
  computed: {
    percentage() {
      return this.totalCount === 0 ? 0 : Math.round((this.voteCount / this.totalCount) * 100);
    },
    optionClasses() {
      if (this.winningOptions.includes(this.optionNumber)) {
        if (this.winningOptions.length === 1) {
          return 'win-option animate__animated animate__bounceIn';
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
  background-color: var(--option-color);
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
  border: var(--size-xs) solid var(--option-color);
  border-radius: var(--size-s);
  margin-top: var(--size-s);
}

.progress-bar {
  transition: width 600ms ease-in-out;
  width: 0;
  height: 30px;
  background-color: var(--option-color);
}

.option.win-option .progress-bar-container {
  border-color: var(--option-color-win);
}

.option.win-option .progress-bar-container .progress-bar {
  background-color: var(--option-color-win);
}

.option.win-option .option-number {
  background-color: var(--option-color-win);
}

.option.draw-option .progress-bar-container {
  border-color: var(--option-color-draw);
}

.option.draw-option .option-number {
  background-color: var(--option-color-draw);
}

.option.draw-option .progress-bar-container .progress-bar {
  background-color: var(--option-color-draw);
}
</style>
