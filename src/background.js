import {
  INJECT_EV,
  INJECT_CODE_SNIPPET,
} from './constants';

chrome.runtime.onConnect.addListener(port => {
  port.onMessage.addListener(function (msg) {
    switch (msg.ev) {
      case INJECT_EV:
        chrome.tabs.query({currentWindow: true, active: true}, function (tabArray) {
          if (!tabArray) return;

          chrome.tabs.executeScript(tabArray[0].id, {
            code: INJECT_CODE_SNIPPET,
            runAt: 'document_end'
          }, Function.prototype);
        });
        break;
    }
  });
});