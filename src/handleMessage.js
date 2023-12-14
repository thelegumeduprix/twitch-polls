import {
  isPollEnd,
  isPollReset,
  isPollResume,
  isPollStart,
  isPollStop,
  isPollTitleChange,
  isPollUntie,
  isPositionChange,
  isPrivilegedUser,
  isValidVote,
} from './messageCheckers';

import store from './store';

export function handleMessage(tags, message) {
  if (isPollStart(message) && isPrivilegedUser(tags)) {
    store.startPoll(message);
  }

  if (isPollStop(message) && isPrivilegedUser(tags)) {
    store.stopPoll();
  }

  if (isPollResume(message) && isPrivilegedUser(tags)) {
    store.resumePoll();
  }

  if (isPollEnd(message) && isPrivilegedUser(tags)) {
    store.endPoll();
  }

  if (isPollTitleChange(message) && isPrivilegedUser(tags)) {
    store.updatePollTitle(message);
  }

  if (isPositionChange(message) && isPrivilegedUser(tags)) {
    store.updatePosition(message);
  }

  if (isPollReset(message) && isPrivilegedUser(tags)) {
    store.resetPoll();
  }

  if (isPollUntie(message) && isPrivilegedUser(tags)) {
    store.untiePoll();
  }

  // anyone enters a poll vote while a poll is active
  if (isValidVote(message)) {
    store.castVote(message, tags.username);
  }
}
