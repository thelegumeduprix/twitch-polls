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
  padding: var(--poll-padding);
  border-radius: var(--poll-corner-radius);
  background-color: var(--poll-background-color);
}

.poll-title {
  font-family: var(--poll-title-font-family);
  font-size: var(--poll-title-font-size);
  margin-bottom: var(--size-xl);
}
</style>
