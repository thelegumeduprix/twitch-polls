import chai, { expect } from "chai";
import chaiDom from "chai-dom";
import globalJsdom from "global-jsdom";
import { handleMessage } from "../src/main.js";
import { within, queries } from "@testing-library/dom";

chai.use(chaiDom);

const USER_1 = {
  username: "user1",
  badges: {
    broadcaster: "1",
  },
};
const USER_2 = {
  username: "user2",
};
const USER_3 = {
  username: "user3",
};

const INITIAL_POLL_STATE = {
  active: false,
  visible: false,
  title: "Poll",
  options: {},
  userVotes: {},
};

const html = `
<!DOCTYPE html>
<html lang="en">
  <body>
    <div class="container">
      <div class="poll"></div>
    </div>
  </body>
</html>
`;

describe("rendering", function () {
  let body;

  describe("when receiving a simple poll start command", function () {
    before(function () {
      globalJsdom(html);
      body = within(document.body, queries);
      handleMessage(USER_1, "!poll", { ...INITIAL_POLL_STATE });
    });

    it("renders a poll with a default title", function () {
      const pollTitle = body.getByRole("heading", {
        name: /poll/i,
      });
      expect(pollTitle).to.exist;
    });

    it("renders exactly two labelless options with the values 0", function () {
      expect(document.querySelectorAll(".option")).to.have.length(2);

      const option1 = document.getElementById("option-1");
      expect(option1).to.exist;
      const option2 = document.getElementById("option-2");
      expect(option2).to.exist;

      const option1Percentage = option1.querySelector(".percentage");
      expect(option1Percentage.textContent).to.equal("0% (0)");

      const option2Percentage = option2.querySelector(".percentage");
      expect(option2Percentage.textContent).to.equal("0% (0)");
    });
  });

  describe("when receiving a simple poll start command when a poll is already visible", function () {
    before(function () {
      globalJsdom(html);
      body = within(document.body, queries);

      let newState = handleMessage(USER_1, "!poll 3", {
        ...INITIAL_POLL_STATE,
      });

      newState = handleMessage(USER_1, "1", newState);
      newState = handleMessage(USER_2, "2", newState);
      newState = handleMessage(USER_3, "3", newState);
      newState = handleMessage(USER_1, "!poll 9", newState);
    });

    it("does not render a new poll", function () {
      expect(document.querySelectorAll(".option")).to.have.length(3);

      const option1 = document.getElementById("option-1");
      expect(option1).to.exist;
      const option2 = document.getElementById("option-2");
      expect(option2).to.exist;
      const option3 = document.getElementById("option-3");
      expect(option3).to.exist;
    });
  });

  describe("when receiving a poll start command with the number 3", function () {
    before(function () {
      globalJsdom(html);
      body = within(document.body, queries);
      handleMessage(USER_1, "!poll 3", { ...INITIAL_POLL_STATE });
    });

    it("renders a poll with a default title", function () {
      const pollTitle = body.getByRole("heading", {
        name: /poll/i,
      });
      expect(pollTitle).to.exist;
    });

    it("renders exactly three labelless options with the values 0", function () {
      expect(document.querySelectorAll(".option")).to.have.length(3);

      const option1 = document.getElementById("option-1");
      expect(option1).to.exist;
      const option2 = document.getElementById("option-2");
      expect(option2).to.exist;
      const option3 = document.getElementById("option-3");
      expect(option3).to.exist;

      const option1Percentage = option1.querySelector(".percentage");
      expect(option1Percentage).to.have.text("0% (0)");

      const option2Percentage = option2.querySelector(".percentage");
      expect(option2Percentage).to.have.text("0% (0)");

      const option3Percentage = option3.querySelector(".percentage");
      expect(option3Percentage).to.have.text("0% (0)");
    });
  });

  describe("when receiving a poll start command with string options", function () {
    before(function () {
      globalJsdom(html);
      body = within(document.body, queries);
      handleMessage(USER_1, '!poll "Title" "answer 1" "answer 2" "answer 3"', {
        ...INITIAL_POLL_STATE,
      });
    });

    it("renders a poll with the provided title", function () {
      const pollTitle = body.getByRole("heading", {
        name: /title/i,
      });
      expect(pollTitle).to.exist;
    });

    it("renders exactly three labeled options with the values 0", function () {
      expect(document.querySelectorAll(".option")).to.have.lengthOf(3);

      const option1 = document.getElementById("option-1");
      expect(option1).to.exist;
      expect(option1).to.contain.text("answer 1");
      const option2 = document.getElementById("option-2");
      expect(option2).to.exist;
      expect(option2).to.contain.text("answer 2");
      const option3 = document.getElementById("option-3");
      expect(option3).to.exist;
      expect(option3).to.contain.text("answer 3");

      const option1Percentage = option1.querySelector(".percentage");
      expect(option1Percentage).to.have.text("0% (0)");

      const option2Percentage = option2.querySelector(".percentage");
      expect(option2Percentage).to.have.text("0% (0)");

      const option3Percentage = option3.querySelector(".percentage");
      expect(option3Percentage).to.have.text("0% (0)");
    });
  });

  describe("when receiving a poll start command with string options but with empty title", function () {
    before(function () {
      globalJsdom(html);
      body = within(document.body, queries);
      handleMessage(USER_1, '!poll "" "answer 1" "answer 2" "answer 3"', {
        ...INITIAL_POLL_STATE,
      });
    });

    it("renders the default title", function () {
      const pollTitle = body.getByRole("heading", {
        name: /poll/i,
      });
      expect(pollTitle).to.exist;
    });

    it("renders exactly three labeled options with the values 0", function () {
      expect(document.querySelectorAll(".option")).to.have.lengthOf(3);

      const option1 = document.getElementById("option-1");
      expect(option1).to.exist;
      expect(option1).to.contain.text("answer 1");
      const option2 = document.getElementById("option-2");
      expect(option2).to.exist;
      expect(option2).to.contain.text("answer 2");
      const option3 = document.getElementById("option-3");
      expect(option3).to.exist;
      expect(option3).to.contain.text("answer 3");

      const option1Percentage = option1.querySelector(".percentage");
      expect(option1Percentage).to.have.text("0% (0)");

      const option2Percentage = option2.querySelector(".percentage");
      expect(option2Percentage).to.have.text("0% (0)");

      const option3Percentage = option3.querySelector(".percentage");
      expect(option3Percentage).to.have.text("0% (0)");
    });
  });

  describe("when receiving a title change command while a poll is active", function () {
    before(function () {
      globalJsdom(html);
      body = within(document.body, queries);
      let newState = handleMessage(USER_1, "!poll", { ...INITIAL_POLL_STATE });
      handleMessage(USER_1, '!polltitle "New Title"', newState);
    });

    it("renders the new poll title", function () {
      const pollTitle = body.getByRole("heading", {
        name: /New Title/i,
      });
      expect(pollTitle).to.exist;
    });
  });

  describe("when receiving votes while a poll is active", function () {
    before(function () {
      globalJsdom(html);
      body = within(document.body, queries);

      let newState = handleMessage(USER_1, "!poll 3", {
        ...INITIAL_POLL_STATE,
      });
      newState = handleMessage(USER_1, "1", newState);
      newState = handleMessage(USER_2, "2", newState);
      newState = handleMessage(USER_3, "3", newState);
    });

    it("updates the option percentages correctly", function () {
      expect(document.querySelector("#option-1 .percentage")).to.have.text(
        "33% (1)"
      );
      expect(document.querySelector("#option-2 .percentage")).to.have.text(
        "33% (1)"
      );
      expect(document.querySelector("#option-3 .percentage")).to.have.text(
        "33% (1)"
      );
    });
  });

  describe("when receiving votes before and after a poll is active", function () {
    before(function () {
      globalJsdom(html);
      body = within(document.body, queries);

      let newState = handleMessage(USER_1, "!poll 3", {
        ...INITIAL_POLL_STATE,
      });
      newState = handleMessage(USER_1, "1", newState);
      newState = handleMessage(USER_2, "2", newState);
      newState = handleMessage(USER_1, "!pollstop", newState);
      newState = handleMessage(USER_3, "3", newState);
    });

    it("updates the option percentages correctly", function () {
      expect(document.querySelector("#option-1 .percentage")).to.have.text(
        "50% (1)"
      );
      expect(document.querySelector("#option-2 .percentage")).to.have.text(
        "50% (1)"
      );
      expect(document.querySelector("#option-3 .percentage")).to.have.text(
        "0% (0)"
      );
    });
  });

  describe("when receiving annuled votes and vote changes", function () {
    before(function () {
      globalJsdom(html);
      body = within(document.body, queries);

      let newState = handleMessage(USER_1, "!poll 3", {
        ...INITIAL_POLL_STATE,
      });
      newState = handleMessage(USER_1, "1", newState);
      newState = handleMessage(USER_2, "0", newState);
      newState = handleMessage(USER_2, "2", newState);
      newState = handleMessage(USER_2, "3", newState);
      newState = handleMessage(USER_3, "1", newState);
      newState = handleMessage(USER_3, "0", newState);
      newState = handleMessage(USER_3, "2", newState);
      newState = handleMessage(USER_3, "0", newState);
    });

    it("updates the option percentages correctly", function () {
      expect(document.querySelector("#option-1 .percentage")).to.have.text(
        "50% (1)"
      );
      expect(document.querySelector("#option-2 .percentage")).to.have.text(
        "0% (0)"
      );
      expect(document.querySelector("#option-3 .percentage")).to.have.text(
        "50% (1)"
      );
    });
  });

  describe("when receiving a poll stop command while an unused poll of 3 was active", function () {
    before(function () {
      globalJsdom(html);
      body = within(document.body, queries);
      let newState = handleMessage(USER_1, "!poll 3", {
        ...INITIAL_POLL_STATE,
      });
      handleMessage(USER_1, "!pollstop", newState);
    });

    it("keeps the poll visible", function () {
      expect(document.querySelector(".poll")).to.be.visible;
    });

    it("marks every option as 'draw'", function () {
      expect(document.getElementById("option-1")).to.have.class("draw-option");
      expect(document.getElementById("option-2")).to.have.class("draw-option");
      expect(document.getElementById("option-3")).to.have.class("draw-option");
    });
  });

  describe("when receiving a poll stop command while a drawed poll of 3 was active", function () {
    before(function () {
      globalJsdom(html);
      body = within(document.body, queries);

      let newState = handleMessage(USER_1, "!poll 3", {
        ...INITIAL_POLL_STATE,
      });
      newState = handleMessage(USER_1, "1", newState);
      newState = handleMessage(USER_2, "2", newState);
      newState = handleMessage(USER_3, "3", newState);
      handleMessage(USER_1, "!pollstop", newState);
    });

    it("keeps the poll visible", function () {
      expect(document.querySelector(".poll")).to.be.visible;
    });

    it("marks every option as 'draw'", function () {
      expect(document.getElementById("option-1")).to.have.class("draw-option");
      expect(document.getElementById("option-2")).to.have.class("draw-option");
      expect(document.getElementById("option-3")).to.have.class("draw-option");
    });
  });

  describe("when receiving a poll stop command while a decided poll of 3 was active", function () {
    before(function () {
      globalJsdom(html);
      body = within(document.body, queries);

      let newState = handleMessage(USER_1, "!poll 3", {
        ...INITIAL_POLL_STATE,
      });
      newState = handleMessage(USER_1, "1", newState);
      newState = handleMessage(USER_2, "1", newState);
      newState = handleMessage(USER_3, "3", newState);
      handleMessage(USER_1, "!pollstop", newState);
    });

    it("keeps the poll visible", function () {
      expect(document.querySelector(".poll")).to.be.visible;
    });

    it("marks the winning option as 'winning'", function () {
      expect(document.getElementById("option-1")).to.have.class(
        "winning-option"
      );
      expect(document.getElementById("option-2")).to.not.have.class(
        "winning-option"
      );
      expect(document.getElementById("option-3")).to.not.have.class(
        "winning-option"
      );
    });
  });

  describe("when receiving a poll resume command while a poll was inactive", function () {
    before(function () {
      globalJsdom(html);
      body = within(document.body, queries);

      let newState = handleMessage(USER_1, "!poll 3", {
        ...INITIAL_POLL_STATE,
      });
      newState = handleMessage(USER_1, "!pollstop", newState);
      newState = handleMessage(USER_2, "2", newState);
      newState = handleMessage(USER_1, "!pollresume", newState);
      newState = handleMessage(USER_3, "3", newState);
    });

    it("keeps the poll visible", function () {
      expect(document.querySelector(".poll")).to.be.visible;
    });

    it("updates the option percentages correctly", function () {
      expect(document.querySelector("#option-1 .percentage")).to.have.text(
        "0% (0)"
      );
      expect(document.querySelector("#option-2 .percentage")).to.have.text(
        "0% (0)"
      );
      expect(document.querySelector("#option-3 .percentage")).to.have.text(
        "100% (1)"
      );
    });
  });

  describe("when receiving a poll end command while a poll was inactive", function () {
    before(function () {
      globalJsdom(html);
      body = within(document.body, queries);

      let newState = handleMessage(USER_1, "!poll 3", {
        ...INITIAL_POLL_STATE,
      });
      newState = handleMessage(USER_1, "!pollend", newState);
    });

    it("removes the poll from the screen", function () {
      expect(document.querySelector(".poll")).to.be.empty;
      expect(document.querySelector(".poll")).to.not.be.visible;
    });
  });

  describe("when receiving a poll-altering command while no poll is visible", function () {
    before(function () {
      globalJsdom(html);
      body = within(document.body, queries);

      let state = {
        active: false,
        visible: false,
        title: "Poll",
        options: {},
        userVotes: {},
      };

      state = handleMessage(USER_1, "!pollresume", state);
      state = handleMessage(USER_1, "!pollstop", state);
      state = handleMessage(USER_1, "!polltitle", state);
      state = handleMessage(USER_1, "!pollend", state);
    });

    it("does not render anything", function () {
      expect(document.querySelector(".poll")).to.be.empty;
      expect(document.querySelector(".poll")).to.not.be.visible;
    });
  });
});
