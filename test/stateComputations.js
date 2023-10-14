import {
  filterValidUserVotes,
  getWinningOptions,
  getVoteCountsPerOption,
  getTotalVoteCount,
} from "../src/stateComputations.js";
import { expect } from "chai";

let pollState;

describe("filterValidUserVotes()", function () {
  describe("when there are no options", function () {
    beforeEach(function () {
      pollState = {
        active: false,
        visible: false,
        title: "Poll",
        options: {},
        userVotes: {},
      };
    });

    it("returns an empty user votes object", function () {
      const filteredUserVotes = filterValidUserVotes(pollState);
      expect(filteredUserVotes).to.eql({});
    });
  });

  describe("when there are 2 options and one of three users annulled the vote", function () {
    beforeEach(function () {
      pollState = {
        active: false,
        visible: false,
        title: "Poll",
        options: { 1: " ", 2: " " },
        userVotes: { user1: "1", user2: "2", user3: "0" },
      };
    });

    it("filters out the annulled vote", function () {
      const filteredUserVotes = filterValidUserVotes(pollState);
      expect(filteredUserVotes).to.eql({
        user1: "1",
        user2: "2",
      });
    });
  });
});

describe("getWinningOptions()", function () {
  describe("when there are no options", function () {
    beforeEach(function () {
      pollState = {
        active: false,
        visible: false,
        title: "Poll",
        options: {},
        userVotes: {},
      };
    });

    it("returns an empty array", function () {
      const winningOptions = getWinningOptions(pollState);
      expect(winningOptions).to.eql([]);
    });
  });

  describe("when there are options, but zero votes", function () {
    beforeEach(function () {
      pollState = {
        active: false,
        visible: false,
        title: "Poll",
        options: { 1: " ", 2: " " },
        userVotes: {},
      };
    });

    it("returns all options as the winning options", function () {
      const winningOptions = getWinningOptions(pollState);
      expect(winningOptions).to.eql(["1", "2"]);
    });
  });

  describe("when there are two options and one vote each", function () {
    beforeEach(function () {
      pollState = {
        active: false,
        visible: false,
        title: "Poll",
        options: { 1: " ", 2: " " },
        userVotes: { user1: "1", user2: "2" },
      };
    });

    it("returns both options as the winning option", function () {
      const winningOptions = getWinningOptions(pollState);
      expect(winningOptions).to.eql(["1", "2"]);
    });
  });

  describe("when there are three options and one vote each", function () {
    beforeEach(function () {
      pollState = {
        active: false,
        visible: false,
        title: "Poll",
        options: { 1: " ", 2: " ", 3: " " },
        userVotes: { user1: "1", user2: "2", user3: "3" },
      };
    });

    it("returns all three options as the winning option", function () {
      const winningOptions = getWinningOptions(pollState);
      expect(winningOptions).to.eql(["1", "2", "3"]);
    });
  });

  describe("when there are three options and one clear winner", function () {
    beforeEach(function () {
      pollState = {
        active: false,
        visible: false,
        title: "Poll",
        options: { 1: " ", 2: " ", 3: " " },
        userVotes: { user1: "2", user2: "3", user3: "3" },
      };
    });

    it("returns the single winning option", function () {
      const winningOptions = getWinningOptions(pollState);
      expect(winningOptions).to.eql(["3"]);
    });
  });

  describe("when there are two options and two votes for the second option and one annuled vote", function () {
    beforeEach(function () {
      pollState = {
        active: false,
        visible: false,
        title: "Poll",
        options: { 1: " ", 2: " " },
        userVotes: { user1: "2", user2: "2", user3: "0" },
      };
    });

    it("returns the single winning option", function () {
      const winningOptions = getWinningOptions(pollState);
      expect(winningOptions).to.eql(["2"]);
    });
  });
});

describe("getVoteCountsPerOption()", function () {
  describe("when there are no options", function () {
    beforeEach(function () {
      pollState = {
        active: false,
        visible: false,
        title: "Poll",
        options: {},
        userVotes: {},
      };
    });

    it("returns an empty object", function () {
      const voteCountsPerOption = getVoteCountsPerOption(pollState);
      expect(voteCountsPerOption).to.eql({});
    });
  });

  describe("when there are options, but zero votes", function () {
    beforeEach(function () {
      pollState = {
        active: false,
        visible: false,
        title: "Poll",
        options: { 1: " ", 2: " " },
        userVotes: {},
      };
    });

    it("returns zero vote counts for all options", function () {
      const voteCountsPerOption = getVoteCountsPerOption(pollState);
      expect(voteCountsPerOption).to.eql({
        1: 0,
        2: 0,
      });
    });
  });

  describe("when there are two options and one vote each", function () {
    beforeEach(function () {
      pollState = {
        active: false,
        visible: false,
        title: "Poll",
        options: { 1: " ", 2: " " },
        userVotes: { user1: "1", user2: "2" },
      };
    });

    it("returns one vote count for each option", function () {
      const voteCountsPerOption = getVoteCountsPerOption(pollState);
      expect(voteCountsPerOption).to.eql({
        1: 1,
        2: 1,
      });
    });
  });

  describe("when there are two options and two votes for the second option", function () {
    beforeEach(function () {
      pollState = {
        active: false,
        visible: false,
        title: "Poll",
        options: { 1: " ", 2: " " },
        userVotes: { user1: "2", user2: "2" },
      };
    });

    it("returns a vote count of two for the second option and zero for the first", function () {
      const voteCountsPerOption = getVoteCountsPerOption(pollState);
      expect(voteCountsPerOption).to.eql({
        1: 0,
        2: 2,
      });
    });
  });

  describe("when there are two options and two votes for the second option and one annuled vote", function () {
    beforeEach(function () {
      pollState = {
        active: false,
        visible: false,
        title: "Poll",
        options: { 1: " ", 2: " " },
        userVotes: { user1: "2", user2: "2", user3: "0" },
      };
    });

    it("returns a vote count of two for the second option and zero for the first", function () {
      const voteCountsPerOption = getVoteCountsPerOption(pollState);
      expect(voteCountsPerOption).to.eql({
        1: 0,
        2: 2,
      });
    });
  });
});

describe("getTotalVoteCount()", function () {
  describe("when there are no options", function () {
    beforeEach(function () {
      pollState = {
        active: false,
        visible: false,
        title: "Poll",
        options: {},
        userVotes: {},
      };
    });

    it("returns 0", function () {
      const totalVoteCount = getTotalVoteCount(pollState);
      expect(totalVoteCount).to.equal(0);
    });
  });

  describe("when there are options, but zero votes", function () {
    beforeEach(function () {
      pollState = {
        active: false,
        visible: false,
        title: "Poll",
        options: { 1: " ", 2: " " },
        userVotes: {},
      };
    });

    it("returns 0", function () {
      const totalVoteCount = getTotalVoteCount(pollState);
      expect(totalVoteCount).to.equal(0);
    });
  });

  describe("when there are options and 2 votes and one annulled vote", function () {
    beforeEach(function () {
      pollState = {
        active: false,
        visible: false,
        title: "Poll",
        options: { 1: " ", 2: " " },
        userVotes: { user1: "1", user2: "2", user3: "0" },
      };
    });

    it("filters out the annulled vote", function () {
      const totalVoteCount = getTotalVoteCount(pollState);
      expect(totalVoteCount).to.equal(2);
    });
  });
});
