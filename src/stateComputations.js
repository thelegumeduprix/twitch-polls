export function filterValidUserVotes(pollState) {
  return Object.entries(pollState.userVotes).reduce((result, [user, vote]) => {
    if (vote !== "0") {
      result[user] = vote;
    }
    return result;
  }, {});
}

export function getWinningOptions(pollState) {
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
