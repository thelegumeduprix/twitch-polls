<template>
  <div
    class="container"
    :class="positionClassName"
  >
    <div
      class="poll"
      v-show="pollState.visible"
    >
      <h1
        id="poll-title"
        class="poll-title"
      >
        {{ pollState.title }}
      </h1>

      <PollOption
        v-for="[optionNumber, optionName] in Object.entries(pollState.options)"
        :optionNumber="optionNumber"
        :optionName="optionName"
        :voteCount="voteCountsPerOption[optionNumber]"
        :totalCount="totalVoteCount"
        :winningOptions="winningOptions"
        :key="optionNumber"
      />
    </div>
  </div>
</template>

<script>
import { getTotalVoteCount, getVoteCountsPerOption, getWinningOptions } from '../helpers';
import { POSITION_MAP } from '../setup';
import store from '../store';
import PollOption from './PollOption.vue';

export default {
  components: {
    PollOption,
  },
  computed: {
    pollState() {
      return store;
    },
    totalVoteCount() {
      return getTotalVoteCount(store);
    },
    voteCountsPerOption() {
      return getVoteCountsPerOption(store);
    },
    winningOptions() {
      return store.active ? [] : getWinningOptions(store);
    },
    positionClassName() {
      return POSITION_MAP[store.position];
    },
  },
};
</script>

<style>
/* Reusable CSS variables */
:root {
  --size-xxs: 0.125rem;
  /* = 2px */
  --size-xs: 0.25rem;
  /* = 4px */
  --size-s: 0.5rem;
  /* = 8px */
  --size-m: 1rem;
  /* = 16px */
  --size-l: 1.5rem;
  /* = 24px */
  --size-xl: 2rem;
  /* = 32 px */
  --size-xxl: 2.5rem;
  /* = 40 px */
}

/* Very basic HTML resets */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-family: Futura, sans-serif;
  color: #ffffff;
}

body {
  height: 100vh;
  font-size: var(--size-l);
}

.container {
  display: flex;
  height: 100%;
  padding: 90px;
}

.container.top-left {
  align-items: flex-start;
}

.container.top-right {
  justify-content: right;
  align-items: flex-start;
}

.container.bottom-right {
  justify-content: right;
  align-items: flex-end;
}

.container.bottom-left {
  align-items: flex-end;
}

.poll {
  min-width: 25%;
  max-width: 600px;
  padding: var(--size-xl);
  border-radius: var(--size-xxl);
  background-color: rgba(0, 0, 0, 0.99);
}

.poll-title {
  font-size: var(--size-xl);
  margin-bottom: var(--size-xl);
}

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
../helpers
