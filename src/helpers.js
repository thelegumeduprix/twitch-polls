function filterValidUserVotes(pollState) {
  return Object.entries(pollState.userVotes).reduce((result, [user, vote]) => {
    if (vote !== '0') {
      result[user] = vote;
    }
    return result;
  }, {});
}

export function getWinningOptions(pollState) {
  // if poll is active, there are no winners
  if (pollState.active) return [];

  const voteCountsPerOption = getVoteCountsPerOption(pollState);

  let winningOptions = [];
  let winningVoteCount = 0;

  Object.entries(voteCountsPerOption).forEach(([option, voteCount]) => {
    if (voteCount == winningVoteCount) {
      winningOptions.push(option);
    } else if (voteCount > winningVoteCount) {
      winningVoteCount = voteCount;
      winningOptions = [option];
    }
  });

  return winningOptions;
}

export function getOptionStatus(pollState) {
  const winningOptions = getWinningOptions(pollState);

  // if there is only one winning option, return it as the only winner
  if (winningOptions.length === 1) {
    return {
      [winningOptions[0]]: 'win',
    };
  }

  // if there are multiple winners differentiate between tie and tiebreakwin
  const optionStatuses = {};
  for (const optionNumber of winningOptions) {
    if (pollState.tiebreakWinner === optionNumber) {
      optionStatuses[optionNumber] = 'tiebreakwin';
    } else {
      optionStatuses[optionNumber] = 'tie';
    }
  }

  return optionStatuses;
}

export function getVoteCountsPerOption(pollState) {
  let voteCountsPerOption = {};
  Object.keys(pollState.options).forEach((option) => {
    voteCountsPerOption[option] = 0;
  });

  const validUserVotes = filterValidUserVotes(pollState);

  Object.values(validUserVotes).forEach((option) => {
    voteCountsPerOption[option] += 1;
  });

  return voteCountsPerOption;
}

export function getTotalVoteCount(pollState) {
  const validUserVotes = filterValidUserVotes(pollState);
  return Object.keys(validUserVotes).length;
}
