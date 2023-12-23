import {
  isPollEnd,
  isPollReset,
  isPollResume,
  isPollStart,
  isPollStop,
  isPollTitleChange,
  isPollTiebreak,
  isPositionChange,
  isPrivilegedUser,
  isValidVote,
} from './messageCheckers';

import store from './store';

export function handleMessage(tags, message) {
  // anyone enters a poll vote while a poll is active
  if (isValidVote(message)) {
    store.castVote(message, tags.username);
  }

  if (isPrivilegedUser(tags)) {
    handlePrivilegedMessage(message);
  }
}

function handlePrivilegedMessage(message) {
  if (isPollStart(message)) {
    store.startPoll(message);
  }

  if (isPollStop(message)) {
    store.stopPoll();
  }

  if (isPollResume(message)) {
    store.resumePoll();
  }

  if (isPollEnd(message)) {
    store.endPoll();
  }

  if (isPollTitleChange(message)) {
    store.updatePollTitle(message);
  }

  if (isPositionChange(message)) {
    store.updatePosition(message);
  }

  if (isPollReset(message)) {
    store.resetPoll();
  }

  if (isPollTiebreak(message)) {
    store.tiebreakPoll();
  }
}
