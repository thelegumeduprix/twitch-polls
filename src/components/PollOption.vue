<template>
  <div
    class="option"
    :class="optionClasses"
    :key="optionNumber"
  >
    <div>
      <div class="option-number">
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
import namesPlugin from "colord/plugins/names";

extend([a11yPlugin, namesPlugin]);

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
    /**
     * @returns {'win'|'draw'|''} a text representation of the status of this option
     */
    optionStatus() {
      if (this.winningOptions.includes(this.optionNumber)) {
        if (this.winningOptions.length === 1) {
          return 'win';
        } else {
          return 'draw';
        }
      }
      return '';
    },
    optionClasses() {
      switch (this.optionStatus) {
        case 'win':
          return 'win-option animate__animated animate__bounceIn';
        case 'draw':
          return 'draw-option animate__animated animate__shakeX';
        default:
          return '';
      }
    },
    optionBackground() {
      // the interesting custom properties should exist on :root (and thus the body)
      const style = getComputedStyle(document.body);
      switch (this.optionStatus) {
        case 'win':
          return style.getPropertyValue('--option-color-win');
        case 'draw':
          return style.getPropertyValue('--option-color-draw');
        default:
          return style.getPropertyValue('--option-color');
      }
    },
    contrastingTextColor() {
      const backgroundColor = colord(this.optionBackground).toHex();
      const toWhiteContrast = colord(backgroundColor).contrast('#ffffff');
      const toBlackContrast = colord(backgroundColor).contrast('#000000');

      if (toWhiteContrast > toBlackContrast) {
        return '#fff';
      } else {
        return '#000';
      }
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
  color: v-bind(contrastingTextColor);
  padding: 0.2em 0.5em;
  font-weight: bold;
  border-radius: var(--poll-option-corner-radius);
  display: inline-block;
  margin-inline-end: var(--size-s);
}

.progress-bar-container {
  width: 100%;
  border: var(--size-xs) solid var(--option-color);
  border-radius: var(--poll-option-corner-radius);
  margin-top: var(--size-s);
  overflow: hidden;
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
