import { beforeAll, describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import App from '../src/components/App.vue';
import store from '../src/store.js';
import { handleMessage } from '../src/handleMessage.js';

const USER_1 = {
  username: 'user1',
  badges: {
    broadcaster: '1',
  },
};
const USER_2 = {
  username: 'user2',
};
const USER_3 = {
  username: 'user3',
};

const INITIAL_POLL_STATE = {
  active: false,
  visible: false,
  title: 'Poll',
  options: {},
  userVotes: {},
};

//FIXME: this is a specific polyfill until we don't need Node 16 support (without native structuredClone) anymore
window.structuredClone = window.structuredClone || function (o) {
  return {
    ...o,
    options: { ...o.options },
    userVotes: { ...o.userVotes },
  };
};

const pollWrapper = mount(App, {
  attachTo: 'body', // 'attachTo' is necessary for isVisible() to work properly
});

describe('rendering', function () {
  describe('when receiving a simple poll start command', function () {
    beforeAll(function () {
      Object.assign(store, structuredClone(INITIAL_POLL_STATE));
      handleMessage(USER_1, '!poll');
    });

    it('shows the poll', function () {
      expect(pollWrapper.get('.poll').isVisible()).to.be.true;
    });

    it('renders a poll with a default title', function () {
      const pollTitle = pollWrapper.get('h1').text();
      expect(pollTitle).to.equal('Poll');
    });

    it('renders exactly two labelless options with the values 0', function () {
      const options = pollWrapper.findAll('.option');
      expect(options).to.have.length(2);

      const option1Percentage = options[0].get('.percentage');
      expect(option1Percentage.text()).to.equal('0% (0)');

      const option2Percentage = options[1].get('.percentage');
      expect(option2Percentage.text()).to.equal('0% (0)');
    });
  });

  describe('when receiving a simple poll start command when a poll is already visible', function () {
    beforeAll(function () {
      Object.assign(store, structuredClone(INITIAL_POLL_STATE));
      handleMessage(USER_1, '!poll 3');

      handleMessage(USER_1, '1');
      handleMessage(USER_2, '2');
      handleMessage(USER_3, '3');
      handleMessage(USER_1, '!poll 9');
    });

    it('does not render a new poll', function () {
      expect(pollWrapper.findAll('.option')).to.have.length(3);
    });
  });

  describe('when receiving a poll start command with the number 3', function () {
    beforeAll(function () {
      Object.assign(store, structuredClone(INITIAL_POLL_STATE));
      handleMessage(USER_1, '!poll 3', { ...INITIAL_POLL_STATE });
    });

    it('renders a poll with a default title', function () {
      const pollTitle = pollWrapper.get('h1').text();
      expect(pollTitle).to.equal('Poll');
    });

    it('renders exactly three labelless options with the values 0', function () {
      const options = pollWrapper.findAll('.option');
      expect(options).to.have.length(3);

      const option1Percentage = options[0].get('.percentage').text();
      expect(option1Percentage).to.equal('0% (0)');

      const option2Percentage = options[1].get('.percentage').text();
      expect(option2Percentage).to.equal('0% (0)');

      const option3Percentage = options[2].get('.percentage').text();
      expect(option3Percentage).to.equal('0% (0)');
    });
  });

  describe('when receiving a poll start command with string options', function () {
    beforeAll(function () {
      Object.assign(store, structuredClone(INITIAL_POLL_STATE));
      handleMessage(USER_1, '!poll "Title" "answer 1" "answer 2" "answer 3"');
    });

    it('renders a poll with the provided title', function () {
      const pollTitle = pollWrapper.get('h1').text();
      expect(pollTitle).to.equal('Title');
    });

    it('renders exactly three labeled options with the values 0', function () {
      const options = pollWrapper.findAll('.option');
      expect(options).to.have.lengthOf(3);

      expect(options[0].text()).to.contain('answer 1');
      expect(options[1].text()).to.contain('answer 2');
      expect(options[2].text()).to.contain('answer 3');

      const option1Percentage = options[0].get('.percentage').text();
      expect(option1Percentage).to.equal('0% (0)');

      const option2Percentage = options[1].get('.percentage').text();
      expect(option2Percentage).to.equal('0% (0)');

      const option3Percentage = options[2].get('.percentage').text();
      expect(option3Percentage).to.equal('0% (0)');
    });
  });

  describe('when receiving a poll start command with string options but with empty title', function () {
    beforeAll(function () {
      Object.assign(store, structuredClone(INITIAL_POLL_STATE));
      handleMessage(USER_1, '!poll "" "answer 1" "answer 2" "answer 3"');
    });

    it('renders the default title', function () {
      const pollTitle = pollWrapper.get('h1').text();
      expect(pollTitle).to.equal('Poll');
    });

    it('renders exactly three labeled options with the values 0', function () {
      const options = pollWrapper.findAll('.option');
      expect(options).to.have.lengthOf(3);

      expect(options[0].text()).to.contain('answer 1');
      expect(options[1].text()).to.contain('answer 2');
      expect(options[2].text()).to.contain('answer 3');

      const option1Percentage = options[0].get('.percentage').text();
      expect(option1Percentage).to.equal('0% (0)');

      const option2Percentage = options[1].get('.percentage').text();
      expect(option2Percentage).to.equal('0% (0)');

      const option3Percentage = options[2].get('.percentage').text();
      expect(option3Percentage).to.equal('0% (0)');
    });
  });

  describe('when receiving a title change command while a poll is active', function () {
    beforeAll(function () {
      Object.assign(store, structuredClone(INITIAL_POLL_STATE));
      handleMessage(USER_1, '!poll');
      handleMessage(USER_1, '!polltitle "New Title"');
    });

    it('renders the new poll title', function () {
      const pollTitle = pollWrapper.get('h1').text();
      expect(pollTitle).to.equal('New Title');
    });
  });

  describe('when receiving votes while a poll is active', function () {
    beforeAll(function () {
      Object.assign(store, structuredClone(INITIAL_POLL_STATE));
      handleMessage(USER_1, '!poll 3');
      handleMessage(USER_1, '1');
      handleMessage(USER_2, '2');
      handleMessage(USER_3, '3');
    });

    it('updates the option percentages correctly', function () {
      const percentages = pollWrapper.findAll('.option .percentage');
      expect(percentages[0].text()).to.equal('33% (1)');
      expect(percentages[1].text()).to.equal('33% (1)');
      expect(percentages[2].text()).to.equal('33% (1)');
    });
  });

  describe('when receiving votes before and after a poll is active', function () {
    beforeAll(function () {
      Object.assign(store, structuredClone(INITIAL_POLL_STATE));
      handleMessage(USER_1, '!poll 3');
      handleMessage(USER_1, '1');
      handleMessage(USER_2, '2');
      handleMessage(USER_1, '!pollstop');
      handleMessage(USER_3, '3');
    });

    it('updates the option percentages correctly', function () {
      const percentages = pollWrapper.findAll('.option .percentage');
      expect(percentages[0].text()).to.equal('50% (1)');
      expect(percentages[1].text()).to.equal('50% (1)');
      expect(percentages[2].text()).to.equal('0% (0)');
    });
  });

  describe('when receiving annuled votes and vote changes', function () {
    beforeAll(function () {
      Object.assign(store, structuredClone(INITIAL_POLL_STATE));
      handleMessage(USER_1, '!poll 3');
      handleMessage(USER_1, '1');
      handleMessage(USER_2, '0');
      handleMessage(USER_2, '2');
      handleMessage(USER_2, '3');
      handleMessage(USER_3, '1');
      handleMessage(USER_3, '0');
      handleMessage(USER_3, '2');
      handleMessage(USER_3, '0');
    });

    it('updates the option percentages correctly', function () {
      const percentages = pollWrapper.findAll('.option .percentage');
      expect(percentages[0].text()).to.equal('50% (1)');
      expect(percentages[1].text()).to.equal('0% (0)');
      expect(percentages[2].text()).to.equal('50% (1)');
    });
  });

  describe('when receiving a poll stop command while an unused poll of 3 was active', function () {
    beforeAll(function () {
      Object.assign(store, structuredClone(INITIAL_POLL_STATE));
      handleMessage(USER_1, '!poll 3');
      handleMessage(USER_1, '!pollstop');
    });

    it('keeps the poll visible', function () {
      expect(pollWrapper.get('.poll').isVisible()).to.be.true;
    });

    it("marks every option as 'tie'", function () {
      const options = pollWrapper.findAll('.option');
      expect(options[0].classes()).to.contain('tie-option');
      expect(options[1].classes()).to.contain('tie-option');
      expect(options[2].classes()).to.contain('tie-option');
    });
  });

  describe('when receiving a poll stop command while a tied poll of 3 was active', function () {
    beforeAll(function () {
      Object.assign(store, structuredClone(INITIAL_POLL_STATE));
      handleMessage(USER_1, '!poll 3');
      handleMessage(USER_1, '1');
      handleMessage(USER_2, '2');
      handleMessage(USER_3, '3');
      handleMessage(USER_1, '!pollstop');
    });

    it('keeps the poll visible', function () {
      expect(pollWrapper.get('.poll').isVisible()).to.be.true;
    });

    it("marks every option as 'tie'", function () {
      const options = pollWrapper.findAll('.option');
      expect(options[0].classes()).to.contain('tie-option');
      expect(options[1].classes()).to.contain('tie-option');
      expect(options[2].classes()).to.contain('tie-option');
    });
  });

  describe('when receiving a poll stop command while a decided poll of 3 was active', function () {
    beforeAll(function () {
      Object.assign(store, structuredClone(INITIAL_POLL_STATE));
      handleMessage(USER_1, '!poll 3');
      handleMessage(USER_1, '1');
      handleMessage(USER_2, '1');
      handleMessage(USER_3, '3');
      handleMessage(USER_1, '!pollstop');
    });

    it('keeps the poll visible', function () {
      expect(pollWrapper.get('.poll').isVisible()).to.be.true;
    });

    it("marks the winning option as 'winning'", function () {
      const options = pollWrapper.findAll('.option');
      expect(options[0].classes()).to.contain('win-option');
      expect(options[1].classes()).to.not.contain('win-option');
      expect(options[2].classes()).to.not.contain('win-option');
    });
  });

  describe('when receiving a poll resume command while a poll was inactive', function () {
    beforeAll(function () {
      Object.assign(store, structuredClone(INITIAL_POLL_STATE));
      handleMessage(USER_1, '!poll 3');
      handleMessage(USER_1, '!pollstop');
      handleMessage(USER_2, '2');
      handleMessage(USER_1, '!pollresume');
      handleMessage(USER_3, '3');
    });

    it('keeps the poll visible', function () {
      expect(pollWrapper.get('.poll').isVisible()).to.be.true;
    });

    it('updates the option percentages correctly', function () {
      const percentages = pollWrapper.findAll('.option .percentage');
      expect(percentages[0].text()).to.equal('0% (0)');
      expect(percentages[1].text()).to.equal('0% (0)');
      expect(percentages[2].text()).to.equal('100% (1)');
    });
  });

  describe('when receiving a poll end command while a poll was inactive', function () {
    beforeAll(function () {
      Object.assign(store, structuredClone(INITIAL_POLL_STATE));
      handleMessage(USER_1, '!poll 3');
      handleMessage(USER_1, '!pollend');
    });

    it('removes the poll from the screen', function () {
      expect(pollWrapper.get('.poll').isVisible()).to.be.false;
    });
  });

  describe('when receiving a poll-altering command while no poll is visible', function () {
    beforeAll(function () {
      Object.assign(store, {
        active: false,
        visible: false,
        title: 'Poll',
        options: {},
        userVotes: {},
      });
      handleMessage(USER_1, '!pollresume');
      handleMessage(USER_1, '!pollstop');
      handleMessage(USER_1, '!polltitle');
      handleMessage(USER_1, '!pollend');
    });

    it('does not render anything', function () {
      expect(pollWrapper.get('.poll').isVisible()).to.be.false;
    });
  });
});
