import {
  handlePollEnd,
  handlePollResume,
  handlePollStart,
  handlePollStop,
  handlePollTitleChange,
  handlePollVote,
} from "./stateUpdaters.js";
import {
  getTotalVoteCount,
  getVoteCountsPerOption,
  getWinningOptions,
} from "./stateComputations.js";
import {
  isPollEnd,
  isPollResume,
  isPollStart,
  isPollStop,
  isPollTitleChange,
  isPositionChange,
  isPrivilegedUser,
  isValidVote,
} from "./messageCheckers.js";

const INITIAL_POLL_STATE = {
  active: false,
  visible: false,
  title: "Poll",
  options: {},
  userVotes: {},
};

const DEBUG_POLL_STATE = {
  active: true,
  visible: true,
  title: "Debug Mode Poll",
  options: { 1: "Pizza", 2: "Jam", 3: "Coffee" },
  userVotes: { user1: "1", user2: "3", user3: "3" },
};

const POSITION_MAP = {
  tl: "top-left",
  tr: "top-right",
  br: "bottom-right",
  bl: "bottom-left",
};

function renderInitial(pollState) {
  const pollElement = document.querySelector(".poll");

  pollElement.style = "visibility: visible;";

  const titleElement = document.createElement("h1");
  titleElement.id = "poll-title";
  titleElement.className = "poll-title";
  titleElement.innerHTML = pollState.title;
  pollElement.append(titleElement);

  Object.entries(pollState.options).forEach(([key, value]) => {
    const option = document.createElement("div");
    option.id = `option-${key}`;
    option.className = "option";

    const optionText = document.createElement("div");
    optionText.innerHTML = `<div class="option-number">${key}</div> ${value}: <span class="percentage">0% (0)</span>`;

    const progressBarContainer = document.createElement("div");
    progressBarContainer.setAttribute("id", `progress-bar-container-${key}`);
    progressBarContainer.className = "progress-bar-container";

    const progressBar = document.createElement("div");
    progressBar.className = "progress-bar";
    progressBar.setAttribute("id", `progress-bar-${key}`);

    progressBarContainer.append(progressBar);
    option.append(optionText);
    option.append(progressBarContainer);
    pollElement.append(option);
  });
}

function renderUpdate(pollState) {
  if (!pollState.visible) {
    const pollElement = document.querySelector(".poll");
    pollElement.innerHTML = "";
    pollElement.style = "visibility: hidden";
    return;
  }

  const titleElement = document.getElementById("poll-title");
  titleElement.innerHTML = pollState.title;

  const totalVoteCount = getTotalVoteCount(pollState);
  const voteCountsPerOption = getVoteCountsPerOption(pollState);

  Object.keys(pollState.options).forEach((option) => {
    const percentageElement = document.querySelector(
      `#option-${option} .percentage`
    );
    const progressBar = document.querySelector(`#progress-bar-${option}`);

    const voteCount = voteCountsPerOption[option] || 0;

    const percentage =
      totalVoteCount === 0 || voteCount === 0
        ? 0
        : Math.round((voteCount / totalVoteCount) * 100);

    progressBar.style.width = percentage + "%";
    percentageElement.innerHTML = `${percentage}% (${voteCount})`;
  });

  if (!pollState.active) {
    const winningOptions = getWinningOptions(pollState);

    if (winningOptions.length === 1) {
      const optionElement = document.getElementById(
        `option-${winningOptions[0]}`
      );

      optionElement.classList.add("winning-option");
      optionElement.classList.add("animate__animated");
      optionElement.classList.add("animate__bounceIn");
    } else if (winningOptions.length > 1) {
      winningOptions.forEach((winningOption) => {
        const optionElement = document.getElementById(
          `option-${winningOption}`
        );

        optionElement.classList.add("draw-option");
        optionElement.classList.add("animate__animated");
        optionElement.classList.add("animate__shakeX");
      });
    }
  } else {
    Object.keys(pollState.options).forEach((option) => {
      const optionElement = document.getElementById(`option-${option}`);
      optionElement.className = "option";
    });
  }
}

function renderPositionChange(message) {
  const positionSuffix = message.split("_")[1];
  const containerElement = document.querySelector(".container");
  const newPositionClassName = POSITION_MAP[positionSuffix];

  containerElement.classList.remove(
    "top-left",
    "top-right",
    "bottom-right",
    "bottom-left"
  );
  containerElement.classList.add(newPositionClassName);
}

export function handleMessage(tags, message, pollState) {
  if (
    isPollStart(message) &&
    isPrivilegedUser(tags) &&
    !pollState.visible &&
    !pollState.active
  ) {
    pollState = handlePollStart(message, pollState);
    renderInitial(pollState);
    return pollState;
  }

  if (isPollStop(message) && isPrivilegedUser(tags)) {
    pollState = handlePollStop(pollState);
    renderUpdate(pollState);
    return pollState;
  }

  if (isPollResume(message) && isPrivilegedUser(tags)) {
    pollState = handlePollResume(pollState);
    renderUpdate(pollState);
    return pollState;
  }

  if (isPollEnd(message) && isPrivilegedUser(tags)) {
    pollState = handlePollEnd(pollState);
    renderUpdate(pollState);
    return pollState;
  }

  if (isPollTitleChange(message) && isPrivilegedUser(tags)) {
    pollState = handlePollTitleChange(message, pollState);
    renderUpdate(pollState);
    return pollState;
  }

  if (isPositionChange(message) && isPrivilegedUser(tags)) {
    renderPositionChange(message);
    return pollState;
  }

  // anyone enters a poll vote while a poll is active
  if (isValidVote(message, pollState)) {
    pollState = handlePollVote(message, tags.username, pollState);
    renderUpdate(pollState);
    return pollState;
  }

  return pollState;
}

export function setup() {
  const queryParameters = new URLSearchParams(window.location.search);

  const POSITION_CODE = queryParameters.get("position");
  let positionClassName = "top-left";

  if (POSITION_CODE && POSITION_MAP[POSITION_CODE]) {
    positionClassName = POSITION_MAP[POSITION_CODE];
  }

  const DEBUG = queryParameters.has("debug");

  document.querySelector(".container").classList.add(positionClassName);

  const CHANNEL_NAME = queryParameters.get("channel");
  const client = tmi.Client({
    channels: [CHANNEL_NAME],
  });

  let pollState;

  if (DEBUG) {
    pollState = { ...DEBUG_POLL_STATE };
    renderInitial(pollState);
    renderUpdate(pollState);
  } else {
    pollState = { ...INITIAL_POLL_STATE };
  }

  client.connect();

  client.on(
    "message",
    (_, tags, message) => (pollState = handleMessage(tags, message, pollState))
  );
}
