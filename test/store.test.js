import { beforeEach, describe, expect, it } from 'vitest';

import store from '../src/store';

describe('resetPoll function', () => {
  beforeEach(function () {
    Object.assign(store, {
      active: false,
      visible: true,
      title: 'Poll',
      options: { 1: 'Pizza', 2: 'Jam', 3: 'Coffee' },
      userVotes: { user1: 1, user2: 2 },
    });
  });

  describe('when the poll is visible and active', () => {
    it('resets only the user votes to an empty object', () => {
      store.active = true;
      store.resetPoll();
      expect(store.userVotes).toEqual({});
    });
  });

  describe('when the poll is visible but not active', () => {
    it('resets the user votes to an empty object', () => {
      store.active = false;
      store.resetPoll();
      expect(store.userVotes).toEqual({});
    });

    it('sets the poll to active', () => {
      store.active = false;
      store.resetPoll();
      expect(store.active).toBe(true);
    });
  });
});

describe('starting a poll with !poll', function () {
  describe('when no current poll is active or visible', function () {
    beforeEach(function () {
      Object.assign(store, {
        active: false,
        visible: false,
        title: 'Poll',
        options: {},
        userVotes: {},
      });
    });

    it('keeps the default title "Poll"', function () {
      expect(store.title).toBe('Poll');
      store.startPoll(`!poll`);
      expect(store.title).toBe('Poll');
    });

    it(`starts a poll when message is: !poll`, function () {
      expect(store.active).toBe(false);
      store.startPoll(`!poll`);
      expect(store.active).toBe(true);
    });

    it(`starts a poll when message is: !poll 3`, function () {
      expect(store.active).toBe(false);
      store.startPoll(`!poll 3`);
      expect(store.active).toBe(true);
    });

    it(`does not start a poll when message is: !poll 1`, function () {
      expect(store.active).toBe(false);
      store.startPoll(`!poll 1`);
      expect(store.active).toBe(false);
    });

    it(`does not start a poll when message is: !poll 10`, function () {
      expect(store.active).toBe(false);
      store.startPoll(`!poll 10`);
      expect(store.active).toBe(false);
    });

    it(`starts a poll when message is: !poll "q" "a" "b"`, function () {
      expect(store.active).toBe(false);
      store.startPoll(`!poll "q" "a" "b"`);
      expect(store.active).toBe(true);
    });

    it(`starts a poll when message is: !poll "" "a" "b"`, function () {
      expect(store.active).toBe(false);
      store.startPoll(`!poll "" "a" "b"`);
      expect(store.active).toBe(true);
    });

    it(`does not start a poll when message is: !poll "" "" "b"`, function () {
      expect(store.active).toBe(false);
      store.startPoll(`!poll "" "" "b"`);
      expect(store.active).toBe(false);
    });

    it(`does not start a poll when message is: !poll "q" "a"`, function () {
      expect(store.active).toBe(false);
      store.startPoll(`!poll "q" "a"`);
      expect(store.active).toBe(false);
    });

    it(`does not start a poll when message is: !poll "q"`, function () {
      expect(store.active).toBe(false);
      store.startPoll(`!poll "q"`);
      expect(store.active).toBe(false);
    });

    it(`does not start a poll when message is: !poll ""`, function () {
      expect(store.active).toBe(false);
      store.startPoll(`!poll ""`);
      expect(store.active).toBe(false);
    });

    it(`does not start a poll when message is: !poll q" "a"`, function () {
      expect(store.active).toBe(false);
      store.startPoll(`!poll q" "a"`);
      expect(store.active).toBe(false);
    });

    describe(`when receiving the message: !poll`, function () {
      it('sets the poll state to active, visible and with two options', function () {
        store.startPoll(`!poll`);

        expect(store).to.deep.include({
          active: true,
          visible: true,
          title: 'Poll',
          options: { 1: ' ', 2: ' ' },
          userVotes: {},
        });
      });
    });

    describe(`when receiving the message: !poll 2`, function () {
      it('sets the poll state to active, visible and with two options', function () {
        store.startPoll('!poll 2');

        expect(store).to.deep.include({
          active: true,
          visible: true,
          title: 'Poll',
          options: { 1: ' ', 2: ' ' },
          userVotes: {},
        });
      });
    });

    describe(`when receiving the message: !poll 9`, function () {
      it('sets the poll state to active, visible and with nine options', function () {
        store.startPoll('!poll 9');

        expect(store).to.deep.include({
          active: true,
          visible: true,
          title: 'Poll',
          options: {
            1: ' ',
            2: ' ',
            3: ' ',
            4: ' ',
            5: ' ',
            6: ' ',
            7: ' ',
            8: ' ',
            9: ' ',
          },
          userVotes: {},
        });
      });
    });
  });

  describe('when a poll is currently active', function () {
    const initialState = {
      active: true,
      visible: false,
      title: 'Poll',
      options: {},
      userVotes: {},
    };
    beforeEach(function () {
      Object.assign(store, structuredClone(initialState));
    });

    it('does not alter the current poll state', function () {
      store.startPoll(`!poll`);
      expect(store).to.deep.include(initialState);
    });
  });

  describe('when a poll is currently visible', function () {
    const initialState = {
      active: false,
      visible: true,
      title: 'Poll',
      options: {},
      userVotes: {},
    };
    beforeEach(function () {
      Object.assign(store, structuredClone(initialState));
    });

    it('does not alter the current poll state', function () {
      store.startPoll(`!poll`);
      expect(store).to.deep.include(initialState);
    });
  });

  describe('when a poll is currently active and visible', function () {
    const initialState = {
      active: true,
      visible: true,
      title: 'Poll',
      options: {},
      userVotes: {},
    };
    beforeEach(function () {
      Object.assign(store, structuredClone(initialState));
    });

    it('does not alter the current poll state', function () {
      store.startPoll(`!poll`);
      expect(store).to.deep.include(initialState);
    });
  });
});

describe('!pollstop', function () {
  beforeEach(function () {
    Object.assign(store, {
      active: true,
      visible: true,
      title: 'Poll',
      options: { 1: ' ', 2: ' ' },
      userVotes: {},
    });
  });

  it('sets the poll to inactive', function () {
    store.stopPoll();
    expect(store).to.deep.include({
      active: false,
      visible: true,
      title: 'Poll',
      options: { 1: ' ', 2: ' ' },
      userVotes: {},
    });
  });
});

describe('!pollresume', function () {
  beforeEach(function () {
    Object.assign(store, {
      active: false,
      visible: true,
      title: 'Poll',
      options: { 1: ' ', 2: ' ' },
      userVotes: {},
    });
  });

  it('sets the poll state to active', function () {
    store.resumePoll();
    expect(store).to.deep.include({
      active: true,
      visible: true,
      title: 'Poll',
      options: { 1: ' ', 2: ' ' },
      userVotes: {},
    });
  });

  describe('when the poll is not active and a tiebreak happened before', function () {
    beforeEach(function () {
      Object.assign(store, {
        visible: true,
        active: false,
        title: 'Poll',
        options: { 1: ' ', 2: ' ' },
        userVotes: {},
        tiebreakMode: true,
        tiebreakWinner: '1',
      });
    });

    it('sets the poll state to active and resets the tiebreak mode and winner', function () {
      store.resumePoll();
      expect(store).to.deep.include({
        active: true,
        visible: true,
        title: 'Poll',
        options: { 1: ' ', 2: ' ' },
        userVotes: {},
        tiebreakMode: false,
        tiebreakWinner: null,
      });
    });
  });
});

describe('!pollend', function () {
  describe('when the poll is active and visible', function () {
    beforeEach(function () {
      Object.assign(store, {
        active: true,
        visible: true,
        title: 'Special Title',
        options: { 1: ' ', 2: ' ' },
        userVotes: { user1: '1', user2: '2' },
      });
    });

    it('resets the poll state to the initial state', function () {
      store.endPoll();
      expect(store).to.deep.include({
        active: false,
        visible: false,
        title: 'Poll',
        options: {},
        userVotes: {},
      });
    });
  });

  describe('when the poll visible but inactive', function () {
    beforeEach(function () {
      Object.assign(store, {
        active: false,
        visible: true,
        title: 'Special Title',
        options: { 1: ' ', 2: ' ' },
        userVotes: { user1: '1', user2: '2' },
      });
    });

    it('resets the poll state to the initial state', function () {
      store.endPoll();
      expect(store).to.deep.include({
        active: false,
        visible: false,
        title: 'Poll',
        options: {},
        userVotes: {},
      });
    });
  });

  describe('when the poll is not visible and not active', function () {
    beforeEach(function () {
      Object.assign(store, {
        active: false,
        visible: false,
        title: 'Special Title',
        options: { 1: ' ', 2: ' ' },
        userVotes: { user1: '1', user2: '2' },
      });
    });

    it('resets the poll state to the initial state', function () {
      store.endPoll();
      expect(store).to.deep.include({
        active: false,
        visible: false,
        title: 'Poll',
        options: {},
        userVotes: {},
      });
    });
  });
});

describe('handlePollTitleChange()', function () {
  beforeEach(function () {
    Object.assign(store, {
      active: false,
      visible: true,
      title: 'Some Title',
      options: { 1: ' ', 2: ' ' },
      userVotes: { user1: '1', user2: '2' },
    });
  });

  it('sets the poll title to the new title and keeps everything else as-is', function () {
    store.updatePollTitle('!polltitle "A New Title"');
    expect(store).to.deep.include({
      active: false,
      visible: true,
      title: 'A New Title',
      options: { 1: ' ', 2: ' ' },
      userVotes: { user1: '1', user2: '2' },
    });
  });
});

describe('store.castVote()', function () {
  beforeEach(function () {
    Object.assign(store, {
      active: true,
      visible: true,
      title: 'Some Title',
      options: { 1: ' ', 2: ' ' },
      userVotes: { user1: '1', user2: '2' },
    });
  });

  it("overrides a user's previous vote to a new vote", function () {
    store.castVote('2', 'user1');
    expect(store).to.deep.include({
      active: true,
      visible: true,
      title: 'Some Title',
      options: { 1: ' ', 2: ' ' },
      userVotes: { user1: '2', user2: '2' },
    });
  });

  it("sets user's previous vote to 0 when zero is provided", function () {
    store.castVote('0', 'user1');
    expect(store).to.deep.include({
      active: true,
      visible: true,
      title: 'Some Title',
      options: { 1: ' ', 2: ' ' },
      userVotes: { user1: '0', user2: '2' },
    });
  });

  it('creates a new vote when a user votes for the first time', function () {
    store.castVote('2', 'user3');
    expect(store).to.deep.include({
      active: true,
      visible: true,
      title: 'Some Title',
      options: { 1: ' ', 2: ' ' },
      userVotes: { user1: '1', user2: '2', user3: '2' },
    });
  });

  it('ignores a vote that is higher than the max number of options', function () {
    store.castVote('3', 'user2');
    expect(store).to.deep.include({
      active: true,
      visible: true,
      title: 'Some Title',
      options: { 1: ' ', 2: ' ' },
      userVotes: { user1: '1', user2: '2' },
    });
  });

  it('ignores a vote that is less than zero', function () {
    store.castVote('-1', 'user2');
    expect(store).to.deep.include({
      active: true,
      visible: true,
      title: 'Some Title',
      options: { 1: ' ', 2: ' ' },
      userVotes: { user1: '1', user2: '2' },
    });
  });

  it('accepts poll votes with a number with a trailing space', function () {
    store.castVote('1 ', 'user2');
    expect(store).to.deep.include({
      active: true,
      visible: true,
      title: 'Some Title',
      options: { 1: ' ', 2: ' ' },
      userVotes: { user1: '1', user2: '1' },
    });
  });

  it('accepts poll votes with a number with a leading space', function () {
    store.castVote(' 1', 'user2');
    expect(store).to.deep.include({
      active: true,
      visible: true,
      title: 'Some Title',
      options: { 1: ' ', 2: ' ' },
      userVotes: { user1: '1', user2: '1' },
    });
  });

  it('accepts poll votes with a number both with a leading and trailing space', function () {
    store.castVote(' 1 ', 'user2');
    expect(store).to.deep.include({
      active: true,
      visible: true,
      title: 'Some Title',
      options: { 1: ' ', 2: ' ' },
      userVotes: { user1: '1', user2: '1' },
    });
  });

  it('accepts poll votes with a number followed by space and another string', function () {
    store.castVote(' 1 LUL', 'user2');
    expect(store).to.deep.include({
      active: true,
      visible: true,
      title: 'Some Title',
      options: { 1: ' ', 2: ' ' },
      userVotes: { user1: '1', user2: '1' },
    });
  });

  it('does not accept poll votes with a number followed by another number', function () {
    store.castVote('11', 'user2');
    expect(store).to.deep.include({
      active: true,
      visible: true,
      title: 'Some Title',
      options: { 1: ' ', 2: ' ' },
      userVotes: { user1: '1', user2: '2' },
    });
  });

  it('does not accept poll votes with a number followed directly by another string', function () {
    store.castVote('1test', 'user2');
    expect(store).to.deep.include({
      active: true,
      visible: true,
      title: 'Some Title',
      options: { 1: ' ', 2: ' ' },
      userVotes: { user1: '1', user2: '2' },
    });
  });

  it('does not accept poll votes if the poll is inactive', function () {
    store.active = false;
    store.castVote('1', 'user2');
    expect(store.userVotes).toEqual({ user1: '1', user2: '2' });
  });

  it('does not accept poll votes if the poll is invisible', function () {
    store.visible = false;
    store.castVote('1', 'user2');
    expect(store.userVotes).toEqual({ user1: '1', user2: '2' });
  });
});

describe('tiebreakPoll()', function () {
  describe('when the poll is visible but not active', function () {
    beforeEach(function () {
      Object.assign(store, {
        visible: true,
        active: false,
        title: 'Poll',
        options: { 1: 'A', 2: 'B' },
        userVotes: {
          user1: '1',
          user2: '2',
        },
        tiebreakMode: false,
        tiebreakWinner: null,
      });
    });

    it('sets the tiebreak mode to true', function () {
      store.tiebreakPoll();
      expect(store.tiebreakMode).toBe(true);
    });

    it('sets the tiebreak winner to a random option', function () {
      store.tiebreakPoll();
      expect(['1', '2']).toContain(store.tiebreakWinner);
    });
  });

  describe('when the poll is visible and active', function () {
    beforeEach(function () {
      Object.assign(store, {
        visible: true,
        active: true,
        title: 'Poll',
        options: { 1: 'A', 2: 'B' },
        userVotes: {
          user1: '1',
          user2: '2',
        },
        tiebreakMode: false,
        tiebreakWinner: null,
      });
    });

    it('does not set the tiebreak mode to true', function () {
      store.tiebreakPoll();
      expect(store.tiebreakMode).toBe(false);
    });

    it('leaves tiebreak winner null', function () {
      store.tiebreakPoll();
      expect(store.tiebreakWinner).toBe(null);
    });
  });
});
