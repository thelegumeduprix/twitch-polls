import {
  isPollStart,
  POLL_SIMPLE_DETECTION_PATTERN,
  POLL_NUMBER_DETECTION_PATTERN,
  POLL_QUOTED_PARAMETER_DETECTION_PATTERN,
  POLL_QUOTED_PARAMETER_EXTRACTION_PATTERN,
  POLL_VOTE_EXTRACTION_PATTERN,
} from "./messageCheckers.js";
import { initialState, updatePollStore } from "./poll-store.js"

export function handlePollStart(message, pollState) {
  if (isPollStart(message) && !pollState.visible && !pollState.active) {
    const newPollState = {
      active: true,
      visible: true,
      title: "Poll",
      options: {},
      userVotes: {},
    };

    if (POLL_SIMPLE_DETECTION_PATTERN.test(message)) {
      for (let index = 1; index <= 2; index++) {
        newPollState.options[index] = " ";
      }
    } else if (POLL_NUMBER_DETECTION_PATTERN.test(message)) {
      const number = message.match(/!poll (\d)/)?.[1];

      if (number) {
        for (let index = 1; index <= number; index++) {
          newPollState.options[index] = " ";
        }
      }
    } else if (POLL_QUOTED_PARAMETER_DETECTION_PATTERN.test(message)) {
      const options = [
        ...message.matchAll(POLL_QUOTED_PARAMETER_EXTRACTION_PATTERN),
      ].map((match) => match[1]);

      const title = options.shift();
      newPollState.title = title || "Poll";

      options.forEach((option, index) => {
        newPollState.options[index + 1] = option;
      });
    }

    updatePollStore(structuredClone(newPollState));

    return newPollState;
  }

  return pollState;
}

export function handlePollStop(pollState) {
  const newPollState = { ...pollState };
  newPollState.active = false;
  updatePollStore("active", false);
  return newPollState;
}

export function handlePollResume(pollState) {
  const newPollState = { ...pollState };
  if (pollState.visible) {
    newPollState.active = true;
    updatePollStore("active", true);
  }
  return newPollState;
}

export function handlePollEnd(pollState) {
  updatePollStore(initialState());
  return initialState();
}

export function handlePollTitleChange(message, pollState) {
  const newPollState = { ...pollState };
  const options = message.match(POLL_QUOTED_PARAMETER_EXTRACTION_PATTERN);

  const title = options.shift().replaceAll('"', "");
  newPollState.title = title;
  updatePollStore("title", title);
  return newPollState;
}

export function handlePollVote(message, username, pollState) {
  const voteNumber = message.match(POLL_VOTE_EXTRACTION_PATTERN)?.[1];
  if (voteNumber && (pollState.options[voteNumber] || voteNumber === "0")) {
    const newPollState = {
      ...pollState,
      userVotes: {
        ...pollState.userVotes,
        [username]: voteNumber
      }
    };
    updatePollStore("userVotes", username, voteNumber);
    return newPollState;
  }
  return pollState
}
