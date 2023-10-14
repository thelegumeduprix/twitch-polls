import { expect } from "chai";
import {
  handlePollEnd,
  handlePollResume,
  handlePollStart,
  handlePollStop,
  handlePollTitleChange,
  handlePollVote,
} from "../src/stateUpdaters.js";

let pollState;

describe("handlePollStart()", function () {
  describe("when no current poll is active or visible", function () {
    beforeEach(function () {
      pollState = {
        active: false,
        visible: false,
        title: "Poll",
        options: {},
        userVotes: {},
      };
    });

    it('keeps the default title "Poll"', function () {
      expect(pollState.title).to.equal("Poll");
      const newState = handlePollStart(`!poll`, pollState);
      expect(newState.title).to.equal("Poll");
    });

    it(`starts a poll when message is: !poll`, function () {
      expect(pollState.active).to.be.false;
      const newState = handlePollStart(`!poll`, pollState);
      expect(newState.active).to.be.true;
    });

    it(`starts a poll when message is: !poll 3`, function () {
      expect(pollState.active).to.be.false;
      const newState = handlePollStart(`!poll 3`, pollState);
      expect(newState.active).to.be.true;
    });

    it(`does not start a poll when message is: !poll 1`, function () {
      expect(pollState.active).to.be.false;
      const newState = handlePollStart(`!poll 1`, pollState);
      expect(newState.active).to.be.false;
    });

    it(`does not start a poll when message is: !poll 10`, function () {
      expect(pollState.active).to.be.false;
      const newState = handlePollStart(`!poll 10`, pollState);
      expect(newState.active).to.be.false;
    });

    it(`starts a poll when message is: !poll "q" "a" "b"`, function () {
      expect(pollState.active).to.be.false;
      const newState = handlePollStart(`!poll "q" "a" "b"`, pollState);
      expect(newState.active).to.be.true;
    });

    it(`starts a poll when message is: !poll "" "a" "b"`, function () {
      expect(pollState.active).to.be.false;
      const newState = handlePollStart(`!poll "" "a" "b"`, pollState);
      expect(newState.active).to.be.true;
    });

    it(`does not start a poll when message is: !poll "" "" "b"`, function () {
      expect(pollState.active).to.be.false;
      const newState = handlePollStart(`!poll "" "" "b"`, pollState);
      expect(newState.active).to.be.false;
    });

    it(`does not start a poll when message is: !poll "q" "a"`, function () {
      expect(pollState.active).to.be.false;
      const newState = handlePollStart(`!poll "q" "a"`, pollState);
      expect(newState.active).to.be.false;
    });

    it(`does not start a poll when message is: !poll "q"`, function () {
      expect(pollState.active).to.be.false;
      const newState = handlePollStart(`!poll "q"`, pollState);
      expect(newState.active).to.be.false;
    });

    it(`does not start a poll when message is: !poll ""`, function () {
      expect(pollState.active).to.be.false;
      const newState = handlePollStart(`!poll ""`, pollState);
      expect(newState.active).to.be.false;
    });

    it(`does not start a poll when message is: !poll q" "a"`, function () {
      expect(pollState.active).to.be.false;
      const newState = handlePollStart(`!poll q" "a"`, pollState);
      expect(newState.active).to.be.false;
    });

    describe(`when receiving the message: !poll`, function () {
      it("sets the poll state to active, visible and with two options", function () {
        const newState = handlePollStart(`!poll`, pollState);

        expect(newState).to.eql({
          active: true,
          visible: true,
          title: "Poll",
          options: { 1: " ", 2: " " },
          userVotes: {},
        });
      });
    });

    describe(`when receiving the message: !poll 2`, function () {
      it("sets the poll state to active, visible and with two options", function () {
        const newState = handlePollStart("!poll 2", pollState);

        expect(newState).to.eql({
          active: true,
          visible: true,
          title: "Poll",
          options: { 1: " ", 2: " " },
          userVotes: {},
        });
      });
    });

    describe(`when receiving the message: !poll 9`, function () {
      it("sets the poll state to active, visible and with nine options", function () {
        const newState = handlePollStart("!poll 9", pollState);

        expect(newState).to.eql({
          active: true,
          visible: true,
          title: "Poll",
          options: {
            1: " ",
            2: " ",
            3: " ",
            4: " ",
            5: " ",
            6: " ",
            7: " ",
            8: " ",
            9: " ",
          },
          userVotes: {},
        });
      });
    });
  });

  describe("when a poll is currently active", function () {
    beforeEach(function () {
      pollState = {
        active: true,
        visible: false,
        title: "Poll",
        options: {},
        userVotes: {},
      };
    });

    it("does not alter the current poll state", function () {
      const newState = handlePollStart(`!poll`, pollState);
      expect(newState).to.equal(pollState);
    });
  });

  describe("when a poll is currently visible", function () {
    beforeEach(function () {
      pollState = {
        active: false,
        visible: true,
        title: "Poll",
        options: {},
        userVotes: {},
      };
    });

    it("does not alter the current poll state", function () {
      const newState = handlePollStart(`!poll`, pollState);
      expect(newState).to.equal(pollState);
    });
  });

  describe("when a poll is currently active and visible", function () {
    beforeEach(function () {
      pollState = {
        active: true,
        visible: true,
        title: "Poll",
        options: {},
        userVotes: {},
      };
    });

    it("does not alter the current poll state", function () {
      const newState = handlePollStart(`!poll`, pollState);
      expect(newState).to.equal(pollState);
    });
  });
});

describe("handlePollStop()", function () {
  beforeEach(function () {
    pollState = {
      active: true,
      visible: true,
      title: "Poll",
      options: { 1: " ", 2: " " },
      userVotes: {},
    };
  });

  it("sets the poll to inactive", function () {
    const newState = handlePollStop(pollState);
    expect(newState).to.eql({
      active: false,
      visible: true,
      title: "Poll",
      options: { 1: " ", 2: " " },
      userVotes: {},
    });
  });
});

describe("handlePollResume()", function () {
  beforeEach(function () {
    pollState = {
      active: false,
      visible: true,
      title: "Poll",
      options: { 1: " ", 2: " " },
      userVotes: {},
    };
  });

  it("sets the poll state to active", function () {
    const newState = handlePollResume(pollState);
    expect(newState).to.eql({
      active: true,
      visible: true,
      title: "Poll",
      options: { 1: " ", 2: " " },
      userVotes: {},
    });
  });
});

describe("handlePollEnd()", function () {
  describe("when the poll is active and visible", function () {
    beforeEach(function () {
      pollState = {
        active: true,
        visible: true,
        title: "Special Title",
        options: { 1: " ", 2: " " },
        userVotes: { user1: "1", user2: "2" },
      };
    });

    it("resets the poll state to the initial state", function () {
      const newState = handlePollEnd(pollState);
      expect(newState).to.eql({
        active: false,
        visible: false,
        title: "Poll",
        options: {},
        userVotes: {},
      });
    });
  });

  describe("when the poll visible but inactive", function () {
    beforeEach(function () {
      pollState = {
        active: false,
        visible: true,
        title: "Special Title",
        options: { 1: " ", 2: " " },
        userVotes: { user1: "1", user2: "2" },
      };
    });

    it("resets the poll state to the initial state", function () {
      const newState = handlePollEnd(pollState);
      expect(newState).to.eql({
        active: false,
        visible: false,
        title: "Poll",
        options: {},
        userVotes: {},
      });
    });
  });

  describe("when the poll is not visible and not active", function () {
    beforeEach(function () {
      pollState = {
        active: false,
        visible: false,
        title: "Special Title",
        options: { 1: " ", 2: " " },
        userVotes: { user1: "1", user2: "2" },
      };
    });

    it("resets the poll state to the initial state", function () {
      const newState = handlePollEnd(pollState);
      expect(newState).to.eql({
        active: false,
        visible: false,
        title: "Poll",
        options: {},
        userVotes: {},
      });
    });
  });
});

describe("handlePollTitleChange()", function () {
  beforeEach(function () {
    pollState = {
      active: false,
      visible: true,
      title: "Some Title",
      options: { 1: " ", 2: " " },
      userVotes: { user1: "1", user2: "2" },
    };
  });

  it("sets the poll title to the new title and keeps everything else as-is", function () {
    const newState = handlePollTitleChange(
      '!polltitle "A New Title"',
      pollState
    );
    expect(newState).to.eql({
      active: false,
      visible: true,
      title: "A New Title",
      options: { 1: " ", 2: " " },
      userVotes: { user1: "1", user2: "2" },
    });
  });
});

describe("handlePollVote()", function () {
  beforeEach(function () {
    pollState = {
      active: false,
      visible: true,
      title: "Some Title",
      options: { 1: " ", 2: " " },
      userVotes: { user1: "1", user2: "2" },
    };
  });

  it("overrides a user's previous vote to a new vote", function () {
    const newState = handlePollVote("2", "user1", pollState);
    expect(newState).to.eql({
      active: false,
      visible: true,
      title: "Some Title",
      options: { 1: " ", 2: " " },
      userVotes: { user1: "2", user2: "2" },
    });
  });

  it("sets user's previous vote to 0 when zero is provided", function () {
    const newState = handlePollVote("0", "user1", pollState);
    expect(newState).to.eql({
      active: false,
      visible: true,
      title: "Some Title",
      options: { 1: " ", 2: " " },
      userVotes: { user1: "0", user2: "2" },
    });
  });

  it("creates a new vote when a user votes for the first time", function () {
    const newState = handlePollVote("2", "user3", pollState);
    expect(newState).to.eql({
      active: false,
      visible: true,
      title: "Some Title",
      options: { 1: " ", 2: " " },
      userVotes: { user1: "1", user2: "2", user3: "2" },
    });
  });

  it("ignores a vote that is higher than the max number of options", function () {
    const newState = handlePollVote("3", "user2", pollState);
    expect(newState).to.eql({
      active: false,
      visible: true,
      title: "Some Title",
      options: { 1: " ", 2: " " },
      userVotes: { user1: "1", user2: "2" },
    });
  });

  it("ignores a vote that is less than zero", function () {
    const newState = handlePollVote("-1", "user2", pollState);
    expect(newState).to.eql({
      active: false,
      visible: true,
      title: "Some Title",
      options: { 1: " ", 2: " " },
      userVotes: { user1: "1", user2: "2" },
    });
  });

  it("accepts poll votes with a number with a trailing space", function () {
    const newState = handlePollVote("1 ", "user2", pollState);
    expect(newState).to.eql({
      active: false,
      visible: true,
      title: "Some Title",
      options: { 1: " ", 2: " " },
      userVotes: { user1: "1", user2: "1" },
    });
  });

  it("accepts poll votes with a number with a leading space", function () {
    const newState = handlePollVote(" 1", "user2", pollState);
    expect(newState).to.eql({
      active: false,
      visible: true,
      title: "Some Title",
      options: { 1: " ", 2: " " },
      userVotes: { user1: "1", user2: "1" },
    });
  });

  it("accepts poll votes with a number both with a leading and trailing space", function () {
    const newState = handlePollVote(" 1 ", "user2", pollState);
    expect(newState).to.eql({
      active: false,
      visible: true,
      title: "Some Title",
      options: { 1: " ", 2: " " },
      userVotes: { user1: "1", user2: "1" },
    });
  });

  it("accepts poll votes with a number followed by space and another string", function () {
    const newState = handlePollVote(" 1 LUL", "user2", pollState);
    expect(newState).to.eql({
      active: false,
      visible: true,
      title: "Some Title",
      options: { 1: " ", 2: " " },
      userVotes: { user1: "1", user2: "1" },
    });
  });

  it("does not accept poll votes with a number followed by another number", function () {
    const newState = handlePollVote("11", "user2", pollState);
    expect(newState).to.eql({
      active: false,
      visible: true,
      title: "Some Title",
      options: { 1: " ", 2: " " },
      userVotes: { user1: "1", user2: "2" },
    });
  });

  it("does not accept poll votes with a number followed directly by another string", function () {
    const newState = handlePollVote("1test", "user2", pollState);
    expect(newState).to.eql({
      active: false,
      visible: true,
      title: "Some Title",
      options: { 1: " ", 2: " " },
      userVotes: { user1: "1", user2: "2" },
    });
  });
});
