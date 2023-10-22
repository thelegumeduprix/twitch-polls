import { createMemo } from "solid-js";
import { pollStore } from "./poll-store";
import { getTotalVoteCount, getVoteCountsPerOption, getWinningOptions } from "./stateComputations";

function optionData(option, voteCountsPerOption, totalVoteCount) {
  const voteCount = voteCountsPerOption[option];
  const percentage =
    totalVoteCount === 0 || voteCount === 0
      ? 0
      : Math.round((voteCount / totalVoteCount) * 100);

  return {
    voteCount,
    percentage,
  }
}

function getOptionClasses(option, winningOptions) {
  if (winningOptions.includes(option)) {
    if (winningOptions.length === 1) {
      return "option winning-option animate__animated animate__bounceIn"
    } else {
      return "option draw-option animate__animated animate__shakeX";
    }
  } else {
    return "option";
  }
}

export default function PollComponent() {
  const totalVoteCount = createMemo(() => getTotalVoteCount(pollStore));
  const voteCountsPerOption = createMemo(() => getVoteCountsPerOption(pollStore));
  const winningOptions = createMemo(() => pollStore.active ? [] : getWinningOptions(pollStore));

  return (
    <div class="poll" style={{ visibility: pollStore.visible ? 'visible' : 'hidden' }}>
      <h1 id="poll-title" class="poll-title">{pollStore.title}</h1>

      <For each={Object.entries(pollStore.options)}>
        {([option, optionName]) => {
          const data = createMemo(() => optionData(option, voteCountsPerOption(), totalVoteCount()));
          return (
            <div class={getOptionClasses(option, winningOptions())} id={'option-' + option}>
              <div>
                <div class="option-number">{option}</div>
                &nbsp;<span contentEditable>{optionName}</span>: <span class="percentage">{data().percentage}% ({data().voteCount})</span>
              </div>
              <div class="progress-bar-container" id={"progress-bar-container-" + option} >
                <div class="progress-bar" id={"progress-bar-" + option} style={{ width: data().percentage + '%' }}></div>
              </div>
            </div>
          );
        }}
      </For>
    </div>
  )
}