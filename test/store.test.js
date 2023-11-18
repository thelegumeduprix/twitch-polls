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
