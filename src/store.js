import { reactive } from 'vue'

import {
  POLL_NUMBER_DETECTION_PATTERN,
  POLL_QUOTED_PARAMETER_DETECTION_PATTERN,
  POLL_QUOTED_PARAMETER_EXTRACTION_PATTERN,
  POLL_SIMPLE_DETECTION_PATTERN,
  POLL_VOTE_EXTRACTION_PATTERN
} from './messageCheckers.js'

const DEBUG_POLL_STATE = {
  active: true,
  visible: true,
  title: 'Debug Mode Poll',
  options: { 1: 'Pizza', 2: 'Jam', 3: 'Coffee' },
  userVotes: { user1: '1', user2: '3', user3: '3' },
  position: 'tl'
}

const INITIAL_STATE = {
  active: false,
  visible: false,
  title: 'Poll',
  options: {},
  userVotes: {},
  position: 'tl'
}

export default reactive({
  active: false,
  visible: true,
  title: 'Debug Mode Poll',
  options: { 1: 'Pizza', 2: 'Jam', 3: 'Coffee' },
  userVotes: { user1: '1', user2: '3', user3: '3' },
  debugMode: false,
  position: 'tl',
  stopPoll() {
    this.active = false
  },
  resumePoll() {
    this.active = true
  },
  endPoll() {
    Object.assign(this, INITIAL_STATE)
  },
  resetPoll() {
    this.active = true
    this.userVotes = {}
  },
  updatePollTitle(message) {
    const options = message.match(POLL_QUOTED_PARAMETER_EXTRACTION_PATTERN)
    const title = options.shift().replaceAll('"', '')
    this.title = title
  },
  updatePosition(message) {
    const positionSuffix = message.split('_')[1]
    this.position = positionSuffix
  },
  castVote(message, username) {
    // don't cast vote if poll is invisible or inactive
    if (!this.visible || !this.active) return

    const voteNumber = message.match(POLL_VOTE_EXTRACTION_PATTERN)?.[1]

    if (voteNumber && (this.options[voteNumber] || voteNumber === '0')) {
      this.userVotes[username] = voteNumber
    }
  },
  setDebugMode(debugMode) {
    this.debugMode = debugMode
    Object.assign(this, DEBUG_POLL_STATE)
  },
  startPoll(message) {
    // don't do anything if the a poll is still running
    if (this.visible || this.active) return

    if (POLL_SIMPLE_DETECTION_PATTERN.test(message)) {
      for (let index = 1; index <= 2; index++) {
        this.options[index] = ' '
      }
    } else if (POLL_NUMBER_DETECTION_PATTERN.test(message)) {
      const number = message.match(/!poll (\d)/)?.[1]

      if (number) {
        for (let index = 1; index <= number; index++) {
          this.options[index] = ' '
        }
      }
    } else if (POLL_QUOTED_PARAMETER_DETECTION_PATTERN.test(message)) {
      const options = [...message.matchAll(POLL_QUOTED_PARAMETER_EXTRACTION_PATTERN)].map((match) => match[1])

      const title = options.shift()
      this.title = title || 'Poll'

      options.forEach((option, index) => {
        this.options[index + 1] = option
      })
    }
  }
})
