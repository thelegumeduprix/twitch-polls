import {
  POLL_SIMPLE_DETECTION_PATTERN,
  POLL_NUMBER_DETECTION_PATTERN,
  POLL_QUOTED_PARAMETER_DETECTION_PATTERN,
  POLL_QUOTED_PARAMETER_EXTRACTION_PATTERN,
  POLL_TITLE_DETECTION_PATTERN,
  POLL_POSITION_DETECTION_PATTERN,
  isPollStart,
  isPollResume,
  isPollEnd,
  isPollStop,
  isPollTitleChange,
  isPositionChange,
  isPrivilegedUser,
  isValidVote,
  POLL_VOTE_EXTRACTION_PATTERN,
} from "../src/messageCheckers.js";
import chai, { expect } from "chai";
import chaiMatch from "chai-match";

chai.use(chaiMatch);

describe("POLL_SIMPLE_DETECTION_PATTERN", function () {
  it("detects the right commands", function () {
    expect("!poll").to.match(POLL_SIMPLE_DETECTION_PATTERN);
    expect("poll").to.not.match(POLL_SIMPLE_DETECTION_PATTERN);
    expect(" !poll").to.not.match(POLL_SIMPLE_DETECTION_PATTERN);
    expect(" !poll ").to.not.match(POLL_SIMPLE_DETECTION_PATTERN);
    expect("!pollabc").to.not.match(POLL_SIMPLE_DETECTION_PATTERN);
  });
});

describe("POLL_NUMBER_DETECTION_PATTERN", function () {
  it("detects the right commands", function () {
    expect("!poll 2").to.match(POLL_NUMBER_DETECTION_PATTERN);
    expect("!poll 9").to.match(POLL_NUMBER_DETECTION_PATTERN);
    expect("!poll 1").not.to.match(POLL_NUMBER_DETECTION_PATTERN);
    expect("!poll 0").not.to.match(POLL_NUMBER_DETECTION_PATTERN);
    expect("!poll 10").not.to.match(POLL_NUMBER_DETECTION_PATTERN);
    expect("poll 2").to.not.match(POLL_NUMBER_DETECTION_PATTERN);
    expect("!poll2").to.not.match(POLL_NUMBER_DETECTION_PATTERN);
    expect(" !poll 2").to.not.match(POLL_NUMBER_DETECTION_PATTERN);
    expect(" !poll 2").to.not.match(POLL_NUMBER_DETECTION_PATTERN);
    expect("!pollabc2").to.not.match(POLL_NUMBER_DETECTION_PATTERN);
  });
});

describe("POLL_QUOTED_PARAMETER_DETECTION_PATTERN", function () {
  it("detects the right commands", function () {
    expect('!poll "q" "a" "b"').to.match(
      POLL_QUOTED_PARAMETER_DETECTION_PATTERN
    );
    expect('!poll "q" "a" "b" "c"').to.match(
      POLL_QUOTED_PARAMETER_DETECTION_PATTERN
    );
    expect('!poll "" "a" "b"').to.match(
      POLL_QUOTED_PARAMETER_DETECTION_PATTERN
    );
    expect('!poll " " "a" "b"').to.match(
      POLL_QUOTED_PARAMETER_DETECTION_PATTERN
    );
    expect('!poll "  " "a" "b"').to.match(
      POLL_QUOTED_PARAMETER_DETECTION_PATTERN
    );
    expect('!poll "" "a" "b" "c"').to.match(
      POLL_QUOTED_PARAMETER_DETECTION_PATTERN
    );
    expect('  !poll "" "a" "b" "c"').to.not.match(
      POLL_QUOTED_PARAMETER_DETECTION_PATTERN
    );
    expect('  !poll "" "a" "b" "c"   ').to.not.match(
      POLL_QUOTED_PARAMETER_DETECTION_PATTERN
    );
    expect('!poll "q" "a"').to.not.match(
      POLL_QUOTED_PARAMETER_DETECTION_PATTERN
    );
    expect('!poll "" "a"').to.not.match(
      POLL_QUOTED_PARAMETER_DETECTION_PATTERN
    );
    expect('!poll "a" ""').to.not.match(
      POLL_QUOTED_PARAMETER_DETECTION_PATTERN
    );
    expect('!poll ""').to.not.match(POLL_QUOTED_PARAMETER_DETECTION_PATTERN);
    expect('!poll "" ""').to.not.match(POLL_QUOTED_PARAMETER_DETECTION_PATTERN);
    expect('!poll "" ""').to.not.match(POLL_QUOTED_PARAMETER_DETECTION_PATTERN);
    expect('!poll "" "" "a"').to.not.match(
      POLL_QUOTED_PARAMETER_DETECTION_PATTERN
    );
  });
});

describe("POLL_QUOTED_PARAMETER_EXTRACTION_PATTERN", function () {
  it("detects the right commands", function () {
    let message = '!poll "q" "a" "b"';
    let parameters = [
      ...message.matchAll(POLL_QUOTED_PARAMETER_EXTRACTION_PATTERN),
    ].map((match) => match[1]);

    expect(parameters).to.eql(["q", "a", "b"]);

    message = '!poll "" "a" "b"';
    parameters = [
      ...message.matchAll(POLL_QUOTED_PARAMETER_EXTRACTION_PATTERN),
    ].map((match) => match[1]);

    expect(parameters).to.eql(["", "a", "b"]);

    message = '!poll "   " " a" " b"';
    parameters = [
      ...message.matchAll(POLL_QUOTED_PARAMETER_EXTRACTION_PATTERN),
    ].map((match) => match[1]);

    expect(parameters).to.eql(["   ", " a", " b"]);
  });
});

describe("POLL_TITLE_DETECTION_PATTERN", function () {
  it("detects the right commands", function () {
    expect('!polltitle "test"').to.match(POLL_TITLE_DETECTION_PATTERN);
    expect('!polltitle"test"').to.not.match(POLL_TITLE_DETECTION_PATTERN);
    expect('!polltitle "test" ').to.not.match(POLL_TITLE_DETECTION_PATTERN);
    expect("!polltitle test").to.not.match(POLL_TITLE_DETECTION_PATTERN);
    expect("!polltitletest").to.not.match(POLL_TITLE_DETECTION_PATTERN);
    expect(' !polltitle "test"').to.not.match(POLL_TITLE_DETECTION_PATTERN);
    expect(' !polltitle "test" ').to.not.match(POLL_TITLE_DETECTION_PATTERN);
  });
});

describe("POLL_POSITION_DETECTION_PATTERN", function () {
  it("detects the right commands", function () {
    expect("!poll_tl").to.match(POLL_POSITION_DETECTION_PATTERN);
    expect("!poll_tr").to.match(POLL_POSITION_DETECTION_PATTERN);
    expect("!poll_br").to.match(POLL_POSITION_DETECTION_PATTERN);
    expect("!poll_bl").to.match(POLL_POSITION_DETECTION_PATTERN);
    expect(" !poll_tl").to.not.match(POLL_POSITION_DETECTION_PATTERN);
    expect("!poll_tl ").to.not.match(POLL_POSITION_DETECTION_PATTERN);
    expect(" !poll_tr").to.not.match(POLL_POSITION_DETECTION_PATTERN);
    expect("!poll_tr ").to.not.match(POLL_POSITION_DETECTION_PATTERN);
    expect(" !poll_br").to.not.match(POLL_POSITION_DETECTION_PATTERN);
    expect("!poll_br ").to.not.match(POLL_POSITION_DETECTION_PATTERN);
    expect(" !poll_bl").to.not.match(POLL_POSITION_DETECTION_PATTERN);
    expect("!poll_bl ").to.not.match(POLL_POSITION_DETECTION_PATTERN);
  });
});

describe("POLL_VOTE_EXTRACTION_PATTERN", function () {
  it("detect and extract poll votes correctly", function () {
    expect("0")
      .to.match(POLL_VOTE_EXTRACTION_PATTERN)
      .and.capture(0)
      .equals("0");

    expect("9")
      .to.match(POLL_VOTE_EXTRACTION_PATTERN)
      .and.capture(0)
      .equals("9");

    expect("2")
      .to.match(POLL_VOTE_EXTRACTION_PATTERN)
      .and.capture(0)
      .equals("2");

    expect("99").to.not.match(POLL_VOTE_EXTRACTION_PATTERN);

    expect("2 ")
      .to.match(POLL_VOTE_EXTRACTION_PATTERN)
      .and.capture(0)
      .equals("2");

    expect(" 2")
      .to.match(POLL_VOTE_EXTRACTION_PATTERN)
      .and.capture(0)
      .equals("2");

    expect(" 2 ")
      .to.match(POLL_VOTE_EXTRACTION_PATTERN)
      .and.capture(0)
      .equals("2");

    expect("2 test")
      .to.match(POLL_VOTE_EXTRACTION_PATTERN)
      .and.capture(0)
      .equals("2");

    expect("2 test ")
      .to.match(POLL_VOTE_EXTRACTION_PATTERN)
      .and.capture(0)
      .equals("2");

    expect(" 2 test")
      .to.match(POLL_VOTE_EXTRACTION_PATTERN)
      .and.capture(0)
      .equals("2");

    expect(" 2 test ")
      .to.match(POLL_VOTE_EXTRACTION_PATTERN)
      .and.capture(0)
      .equals("2");

    expect("2test").to.not.match(POLL_VOTE_EXTRACTION_PATTERN);
    expect(" 2test").to.not.match(POLL_VOTE_EXTRACTION_PATTERN);
    expect(" 2test ").to.not.match(POLL_VOTE_EXTRACTION_PATTERN);
    expect("test 2").to.not.match(POLL_VOTE_EXTRACTION_PATTERN);
    expect("test2").to.not.match(POLL_VOTE_EXTRACTION_PATTERN);
  });
});

describe("isPollStart()", function () {
  it("returns true for the right commands", function () {
    expect(isPollStart("!poll")).to.be.true;
    expect(isPollStart("!poll 9")).to.be.true;
    expect(isPollStart('!poll "q" "a" "b"')).to.be.true;
  });

  it("returns false for other commands", function () {
    expect(isPollStart('!polltitle "a"')).to.be.false;
    expect(isPollStart("!pollend")).to.be.false;
  });
});

describe("isPollResume()", function () {
  it("returns true for the right command", function () {
    expect(isPollResume("!pollresume")).to.be.true;
  });

  it("returns false for other commands", function () {
    expect(isPollResume('!polltitle "a"')).to.be.false;
    expect(isPollResume("!pollend")).to.be.false;
  });
});

describe("isPollEnd()", function () {
  it("returns true for the right command", function () {
    expect(isPollEnd("!pollend")).to.be.true;
  });

  it("returns false for other commands", function () {
    expect(isPollEnd('!polltitle "a"')).to.be.false;
    expect(isPollEnd("!poll")).to.be.false;
  });
});

describe("isPollStop()", function () {
  it("returns true for the right command", function () {
    expect(isPollStop("!pollstop")).to.be.true;
  });

  it("returns false for other commands", function () {
    expect(isPollStop('!polltitle "a"')).to.be.false;
    expect(isPollStop("!poll")).to.be.false;
  });
});

describe("isPollTitleChange()", function () {
  it("returns true for the right command", function () {
    expect(isPollTitleChange('!polltitle "a"')).to.be.true;
  });

  it("returns false for other commands", function () {
    expect(isPollTitleChange("!pollstop")).to.be.false;
    expect(isPollTitleChange("!poll")).to.be.false;
  });
});

describe("isPositionChange()", function () {
  it("returns true for the right commands", function () {
    expect(isPositionChange("!poll_tl")).to.be.true;
    expect(isPositionChange("!poll_tr")).to.be.true;
    expect(isPositionChange("!poll_bl")).to.be.true;
    expect(isPositionChange("!poll_br")).to.be.true;
  });

  it("returns false for other commands", function () {
    expect(isPollTitleChange("!pollstop")).to.be.false;
    expect(isPollTitleChange("!poll")).to.be.false;
  });
});

describe("isPrivilegedUser()", function () {
  it("returns true if the user is the broadcaster", function () {
    expect(isPrivilegedUser({ badges: { broadcaster: "1" } })).to.be.true;
  });

  it("returns true if the user is the mod", function () {
    expect(isPrivilegedUser({ mod: true })).to.be.true;
  });

  it("returns false if the user is not the broadcaster and no mod info exists", function () {
    expect(isPrivilegedUser({ badges: {} })).to.be.false;
  });

  it("returns false if the user is not the broadcaster and mod is set to false", function () {
    expect(isPrivilegedUser({ badges: {}, mod: false })).to.be.false;
  });
});

describe("isValidVote()", function () {
  it("returns false if the poll is inactive", function () {
    const pollState = {
      active: false,
      visible: true,
      title: "Some Title",
      options: { 1: " ", 2: " " },
      userVotes: { user1: "1", user2: "2" },
    };

    const message = "2";

    expect(isValidVote(message, pollState)).to.be.false;
  });

  it("returns false if the poll is invisible", function () {
    const pollState = {
      active: true,
      visible: false,
      title: "Some Title",
      options: { 1: " ", 2: " " },
      userVotes: { user1: "1", user2: "2" },
    };

    const message = "2";

    expect(isValidVote(message, pollState)).to.be.false;
  });

  it("returns false if the message does not start with a separate single digit number", function () {
    const pollState = {
      active: true,
      visible: true,
      title: "Some Title",
      options: { 1: " ", 2: " " },
      userVotes: { user1: "1", user2: "2" },
    };

    let message = "some text";
    expect(isValidVote(message, pollState)).to.be.false;

    message = "some text 2";
    expect(isValidVote(message, pollState)).to.be.false;

    message = "2text";
    expect(isValidVote(message, pollState)).to.be.false;

    message = " 2text";
    expect(isValidVote(message, pollState)).to.be.false;
  });

  it("returns true if the message starts with a separate single digit number", function () {
    const pollState = {
      active: true,
      visible: true,
      title: "Some Title",
      options: { 1: " ", 2: " " },
      userVotes: { user1: "1", user2: "2" },
    };

    let message = "9";
    expect(isValidVote(message, pollState)).to.be.true;

    message = "0";
    expect(isValidVote(message, pollState)).to.be.true;

    message = "2";
    expect(isValidVote(message, pollState)).to.be.true;

    message = "99";
    expect(isValidVote(message, pollState)).to.be.false;

    message = "2 test";
    expect(isValidVote(message, pollState)).to.be.true;

    message = "2 test ";
    expect(isValidVote(message, pollState)).to.be.true;

    message = " 2 test";
    expect(isValidVote(message, pollState)).to.be.true;

    message = " 2 test ";
    expect(isValidVote(message, pollState)).to.be.true;

    message = "2test";
    expect(isValidVote(message, pollState)).to.be.false;

    message = " 2test";
    expect(isValidVote(message, pollState)).to.be.false;

    message = " 2test ";
    expect(isValidVote(message, pollState)).to.be.false;

    message = "test 2";
    expect(isValidVote(message, pollState)).to.be.false;

    message = "test2";
    expect(isValidVote(message, pollState)).to.be.false;
  });
});
