export const POLL_SIMPLE_DETECTION_PATTERN = /^!poll$/;

export const POLL_NUMBER_DETECTION_PATTERN = /^!poll [2-9]$/;

export const POLL_QUOTED_PARAMETER_DETECTION_PATTERN =
  /^!poll( "[^"]*")( "[^"]+"){2,}$/;

export const POLL_QUOTED_PARAMETER_EXTRACTION_PATTERN = /"([^"]*)"/g;

export const POLL_TITLE_DETECTION_PATTERN = /^!polltitle( "[^"]+")$/;

export const POLL_POSITION_DETECTION_PATTERN =
  /^!poll_tl$|^!poll_tr$|^!poll_br$|^!poll_bl$/;

export const POLL_VOTE_EXTRACTION_PATTERN = /^\s*(\d)(?: .*)?$/;

export const isPollStart = (message) =>
  POLL_SIMPLE_DETECTION_PATTERN.test(message) ||
  POLL_NUMBER_DETECTION_PATTERN.test(message) ||
  POLL_QUOTED_PARAMETER_DETECTION_PATTERN.test(message);

export const isPollResume = (message) => /^!pollresume/g.test(message);

export const isPollEnd = (message) => /^!pollend/g.test(message);

export const isPollStop = (message) => /^!pollstop/g.test(message);

export const isPollTitleChange = (message) =>
  POLL_TITLE_DETECTION_PATTERN.test(message);

export const isPositionChange = (message) =>
  POLL_POSITION_DETECTION_PATTERN.test(message);

export const isPrivilegedUser = (tags) =>
  Boolean(tags.badges?.broadcaster || tags.mod);

export const isValidVote = (message, pollState) =>
  pollState.active &&
  pollState.visible &&
  POLL_VOTE_EXTRACTION_PATTERN.test(message);
