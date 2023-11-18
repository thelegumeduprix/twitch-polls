import tmi from 'tmi.js';
import { handleMessage } from './handleMessage';
import store from './store';

export const POSITION_MAP = {
  tl: 'top-left',
  tr: 'top-right',
  br: 'bottom-right',
  bl: 'bottom-left',
};

export function setup() {
  const queryParameters = new URLSearchParams(window.location.search);

  const POSITION_CODE = queryParameters.get('position');
  const DEBUG = queryParameters.has('debug');
  const CHANNEL_NAME = queryParameters.get('channel');

  if (POSITION_CODE && POSITION_MAP[POSITION_CODE]) {
    store.updatePosition(POSITION_CODE);
  }

  if (DEBUG) {
    store.setDebugMode(true);

    window.chat = (message, username = 'testuser', mod = true) => {
      handleMessage({ mod, username }, message);
    };
  }

  const client = tmi.Client({
    channels: [CHANNEL_NAME],
  });

  client.connect();

  client.on('message', (_, tags, message) => handleMessage(tags, message));
}
