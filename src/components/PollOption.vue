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
      >
        <Trophy
          v-if="status === 'win' && useIcons"
          class="progress-bar-trophy-icon"
        />
      </div>
      <div
        v-if="status === 'tiebreakwin'"
        class="progress-bar-extension"
      >
        <Dice
          v-if="useIcons"
          class="progress-bar-dice-icon"
        />
        <svg
          v-else
          class="progress-bar-dice-icon"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { colord, extend } from 'colord';
import a11yPlugin from 'colord/plugins/a11y';
import namesPlugin from 'colord/plugins/names';
import config from '@/config';
import Dice from '@resources/dice.svg?component';
import Trophy from '@resources/trophy.svg?component';

extend([a11yPlugin, namesPlugin]);

export default {
  props: {
    optionNumber: String,
    optionName: String,
    voteCount: Number,
    totalCount: Number,
    winningOptions: Array,
    status: String, // 'win'|'tie'|'tiebreakwin'
  },
  components: {
    Dice,
    Trophy,
  },
  computed: {
    percentage() {
      return this.totalCount === 0 ? 0 : Math.round((this.voteCount / this.totalCount) * 100);
    },
    optionClasses() {
      switch (this.status) {
        case 'win':
          return 'win-option animate__animated animate__bounceIn';
        case 'tie':
          return 'tie-option animate__animated animate__headShake';
        case 'tiebreakwin':
          return 'tiebreakwin-option animate__animated animate__bounceIn';
        default:
          return '';
      }
    },
    optionBackground() {
      // the interesting custom properties should exist on :root (and thus the body)
      const style = getComputedStyle(document.body);
      switch (this.status) {
        case 'win':
          return style.getPropertyValue('--option-color-win');
        case 'tie':
          return style.getPropertyValue('--option-color-tie');
        case 'tiebreakwin':
          return style.getPropertyValue('--option-color-win');
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
    useIcons() {
      return config.useIcons;
    },
  },
};
</script>

<style>
@layer poll-defaults {
  .option {
    --option-status-color: var(--option-color);
  }
  .option.win-option {
    --option-status-color: var(--option-color-win);
  }
  .option.tie-option {
    --option-status-color: var(--option-color-tie);
  }
  .option.tiebreakwin-option {
    --option-status-color: var(--option-color-win);
  }

  .option + .option {
    margin-top: var(--size-m);
  }

  .option-number {
    display: inline-block;
    margin-inline-end: var(--size-s);
    padding: 0.2em 0.5em;
    background-color: var(--option-status-color);
    color: v-bind(contrastingTextColor);
    font-weight: bold;
    border-radius: var(--poll-option-corner-radius);
  }

  .progress-bar-container {
    display: flex;
    width: 100%;
    margin-top: var(--size-s);
    border: var(--size-xs) solid var(--option-status-color);
    border-radius: var(--poll-option-corner-radius);
  }

  .progress-bar {
    position: relative;
    transition: width 600ms ease-in-out;
    width: 0;
    height: 30px;
    background-color: var(--option-status-color);
  }

  .progress-bar-extension {
    background-color: var(--option-status-color);
  }

  svg {
    width: 30px;
    height: 30px;
    color: v-bind('contrastingTextColor');
    display: block;
  }
  .progress-bar-trophy-icon {
    position: absolute;
    right: 8px;
  }
  .progress-bar-dice-icon {
    margin-inline: 16px 8px;
  }
}
</style>
